import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentInfoDto } from './dto/create-department-info.dto';
import { UpdateDepartmentInfoDto } from './dto/update-department-info.dto';
import { UserRole } from '@repo/db/prisma/client';

@Injectable()
export class DepartmentInfoService {
  constructor(private readonly prisma: PrismaService) {}

  private assertHodRole(userRole: UserRole) {
    if (userRole !== UserRole.HOD) {
      throw new ForbiddenException('Only HOD users can perform this action');
    }
  }

  private async verifyHodDepartment(userId: string, departmentId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.dept_id !== departmentId) {
      throw new ForbiddenException("You are not authorized to manage this department's information.");
    }
  }

  async createDepartmentInfo(userId: string, userRole: UserRole, dto: CreateDepartmentInfoDto) {
    this.assertHodRole(userRole);

    // Fetch user to get their department ID
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.dept_id) {
      throw new ForbiddenException('User is not associated with any department.');
    }
    const departmentId = user.dept_id;

    const { studentStrength, ...departmentInfoData } = dto;

    return this.prisma.$transaction(async (tx) => {
      const newDepartmentInfo = await tx.departmentInfo.create({
        data: {
          ...departmentInfoData,
          departmentId: departmentId,
        },
      });

      if (studentStrength && studentStrength.length > 0) {
        await tx.studentStrength.createMany({
          data: studentStrength.map((strength) => ({
            ...strength,
            departmentInfoId: newDepartmentInfo.id,
          })),
        });
      }

      return tx.departmentInfo.findUnique({
        where: { id: newDepartmentInfo.id },
        include: { studentStrength: true },
      });
    });
  }

  async getDepartmentInfo(userId: string, userRole: UserRole) {
    this.assertHodRole(userRole);

    // Fetch user to get their department ID
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.dept_id) {
      throw new ForbiddenException('User is not associated with any department.');
    }
    const departmentId = user.dept_id;

    const info = await this.prisma.departmentInfo.findFirst({
      where: { departmentId: departmentId },
      include: {
        studentStrength: true,
      },
    });

    if (!info) {
      throw new NotFoundException('No department information found for this department.');
    }
    return info;
  }

  async getDepartmentInfoById(id: string) {
    const info = await this.prisma.departmentInfo.findUnique({
      where: { id },
      include: { studentStrength: true },
    });
    if (!info) {
      throw new NotFoundException('Department information not found.');
    }
    return info;
  }

  async updateDepartmentInfo(userId: string, userRole: UserRole, id: string, dto: UpdateDepartmentInfoDto) {
    this.assertHodRole(userRole);

    const departmentInfo = await this.prisma.departmentInfo.findUnique({
      where: { id },
    });
    if (!departmentInfo) {
      throw new NotFoundException('Department information not found');
    }

    await this.verifyHodDepartment(userId, departmentInfo.departmentId);

    const { studentStrength, ...departmentInfoData } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.departmentInfo.update({
        where: { id },
        data: { ...departmentInfoData },
      });

      if (studentStrength && studentStrength.length > 0) {
        await tx.studentStrength.deleteMany({
          where: { departmentInfoId: id },
        });
        await tx.studentStrength.createMany({
          data: studentStrength.map((strength) => ({
            ...strength,
            departmentInfoId: id,
          })),
        });
      }

      return tx.departmentInfo.findUnique({
        where: { id },
        include: { studentStrength: true },
      });
    });
  }

  async deleteDepartmentInfo(userId: string, userRole: UserRole, id: string) {
    this.assertHodRole(userRole);

    const departmentInfo = await this.prisma.departmentInfo.findUnique({
      where: { id },
    });
    if (!departmentInfo) {
      throw new NotFoundException('Department information not found');
    }

    await this.verifyHodDepartment(userId, departmentInfo.departmentId);

    return this.prisma.departmentInfo.delete({ where: { id } });
  }
}
