import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { config } from 'src/common/config';
import { generateOtp } from 'src/common/utils/auth.utils';
import { MailService } from 'src/mail/mail.service';
import { UserRole } from '@repo/db/prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      config.google.callbackUrl,
    );
  }

  async handleGoogleAuth(idToken: string) {
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken,
        audience: config.google.clientId,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid google id token');
      }
      const { email, sub: googleId, given_name, family_name } = payload;
      if (!email) {
        throw new UnauthorizedException('Invalid google id token');
      }
      let user = await this.prismaService.user.findFirst({
        where: {
          user_email: email,
        },
      });
      if (!user) {
        user = await this.prismaService.user.create({
          data: {
            user_email: email,
            user_name: `${given_name} ${family_name}`,
            user_password: '', // Google auth users don't need password
            user_role: UserRole.FACULTY, // Default role for Google auth users
            dept_id: '', // This should be set based on business logic
          },
        });
      }
      const jwtPayload = {
        id: user.id,
        email: user.user_email,
        name: user.user_name,
        role: user.user_role,
        sub: googleId,
      };

      const token = await this.jwtService.signAsync(jwtPayload, {
        expiresIn: config.jwt.expiresIn,
      });
      return {
        token,
        user: {
          id: user.id,
          email: user.user_email,
          name: user.user_name,
          role: user.user_role,
        },
      };
    } catch (error) {
      this.logger.error(`error occured while verifying google id token: ${idToken}, ${error}`);
      throw new UnauthorizedException('Invalid google id token');
    }
  }

  handleOtpAuth(email: string) {
    try {
      // For testing purposes, always return success with hardcoded OTP
      console.log(`OTP sent to ${email}: 123456`);
      return true;

      // Original OTP logic (commented out for testing)
      /*
      const otp = await this.prismaService.otp.findFirst({
        where: { email },
      });
      if (otp) {
        if (otp.expiresAt && otp.expiresAt > new Date()) {
          void this.mailService.sendTemplateMail({
            to: email,
            subject: 'Your OTP for Heizen',
            templateName: 'OTP',
            context: {
              otp: otp.otp,
              validity: 5,
            },
          });
          return true;
        }
        await this.prismaService.otp.delete({ where: { id: otp.id } });
      }

      await this.generateAndSendOtp(email);
      return true;
      */
    } catch (error) {
      this.logger.error(`[ERROR: handleOtpAuth] ${email}, ${error.message}`);
      throw new UnauthorizedException('Invalid otp');
    }
  }

  async verifyOtp(email: string, otp: string, expectedRole?: string) {
    // For testing purposes, hardcode OTP
    const hardcodedOtp = '123456';

    // Check if using hardcoded OTP for testing
    if (otp === hardcodedOtp) {
      console.log('Using hardcoded OTP for testing');
    } else {
      const otpRecord = await this.prismaService.otp.findFirst({
        where: { email },
      });
      if (!otpRecord) {
        throw new UnauthorizedException('Invalid otp');
      }
      if (otpRecord.expiresAt && otpRecord.expiresAt < new Date()) {
        throw new UnauthorizedException('OTP expired');
      }
      if (otpRecord.otp !== otp) {
        throw new UnauthorizedException('Invalid otp');
      }
      await this.prismaService.otp.delete({ where: { id: otpRecord.id } });
    }

    // Check if user exists in User table
    let user = await this.prismaService.user.findFirst({
      where: { user_email: email },
    });

    // If user doesn't exist in User table, check Qac table
    if (!user) {
      const qacUser = await this.prismaService.qac.findFirst({
        where: { qac_email: email },
      });

      if (qacUser) {
        // Create user in User table with QAC role
        user = await this.prismaService.user.create({
          data: {
            user_email: email,
            user_name: qacUser.qac_name,
            user_password: '', // OTP users don't need password
            user_role: UserRole.QAC,
            dept_id: '', // QAC users don't belong to a specific department
          },
        });
      } else {
        // Create user with default role if not exists
        const defaultRole = this.getDefaultRole(email);
        user = await this.prismaService.user.create({
          data: {
            user_email: email,
            user_name: email.split('@')[0], // Use email prefix as default name
            user_password: '', // OTP users don't need password
            user_role: defaultRole,
            dept_id: '', // This should be set based on business logic
          },
        });
      }
    }

    // Validate role if expected role is provided
    if (expectedRole && user.user_role !== expectedRole) {
      throw new UnauthorizedException(
        `Access denied. Expected role: ${expectedRole}, but user has role: ${user.user_role}`,
      );
    }

    const jwtPayload = {
      id: user.id,
      email: user.user_email,
      name: user.user_name,
      role: user.user_role,
      sub: user.id,
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: config.jwt.expiresIn,
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.user_email,
        name: user.user_name,
        role: user.user_role,
      },
    };
  }

  async loginWithPassword(email: string, password: string, expectedRole?: string) {
    this.logger.log(`[loginWithPassword] Attempting login for email: ${email}`);
    // Find user by email
    const user = await this.prismaService.user.findFirst({
      where: { user_email: email },
    });
    if (!user) {
      this.logger.warn(`[loginWithPassword] No user found for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.user_password);
    this.logger.log(`[loginWithPassword] Password match for email ${email}: ${isMatch}`);
    if (!isMatch) {
      this.logger.warn(`[loginWithPassword] Password mismatch for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }
    // Validate role if expectedRole is provided
    if (expectedRole && user.user_role !== expectedRole) {
      this.logger.warn(
        `[loginWithPassword] Role mismatch for email: ${email}. Expected: ${expectedRole}, Found: ${user.user_role}`,
      );
      throw new UnauthorizedException(
        `Access denied. Expected role: ${expectedRole}, but user has role: ${user.user_role}`,
      );
    }
    // Generate JWT
    const jwtPayload = {
      id: user.id,
      email: user.user_email,
      name: user.user_name,
      role: user.user_role,
      sub: user.id,
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: config.jwt.expiresIn,
    });
    this.logger.log(`[loginWithPassword] Login successful for email: ${email}`);
    return {
      token,
      user: {
        id: user.id,
        email: user.user_email,
        name: user.user_name,
        role: user.user_role,
      },
    };
  }

  private getDefaultRole(email: string): UserRole {
    // Map specific admin emails to roles
    const roleMapping = {
      'qac@admin.com': UserRole.QAC,
      'hod@admin.com': UserRole.HOD,
      'faculty@admin.com': UserRole.FACULTY,
    };
    return roleMapping[email as keyof typeof roleMapping] || UserRole.FACULTY;
  }

  private async generateAndSendOtp(email: string) {
    const otp = generateOtp();
    await this.prismaService.otp.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 1000 * 60 * 5),
      },
    });
    void this.mailService.sendTemplateMail({
      to: email,
      subject: 'Your OTP for Heizen',
      templateName: 'OTP',
      context: {
        otp: otp,
        validity: 5,
      },
    });
  }
}
