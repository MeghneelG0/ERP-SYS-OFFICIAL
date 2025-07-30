import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';
import { UserRole } from '@repo/db/prisma/client';

@Injectable()
export class PillarService {
  constructor(private readonly prisma: PrismaService) {}

  private assertQacRole(userRole: UserRole) {
    if (userRole !== UserRole.QAC) {
      throw new ForbiddenException('Only QAC users can perform this action');
    }
  }

  async createPillar(userId: string, userRole: UserRole, dto: CreatePillarDto) {
    if (!userId) throw new ForbiddenException('User not authenticated');
    this.assertQacRole(userRole);

    await this.prisma.pillarTemplate.create({
      data: {
        pillar_name: dto.pillar_name,
        description: dto.description,
        pillar_value: dto.pillar_value,
        percentage_target_achieved: dto.percentage_target_achieved,
        performance: dto.performance,
        academic_year: new Date().getFullYear(),
        created_by_user: userId,
      },
      include: {
        kpi_templates: true,
      },
    });

    return {
      message: 'Pillar created successfully',
    };
  }

  async updatePillar(userId: string, userRole: UserRole, pillarId: string, dto: UpdatePillarDto) {
    this.assertQacRole(userRole);
    const pillar = await this.prisma.pillarTemplate.findUnique({ where: { id: pillarId } });
    if (!pillar) throw new NotFoundException('Pillar not found');
    if (pillar.created_by_user !== userId) throw new ForbiddenException('Not allowed');

    return this.prisma.pillarTemplate.update({
      where: { id: pillarId },
      data: {
        pillar_name: dto.pillar_name,
        description: dto.description,
        pillar_value: dto.pillar_value,
        percentage_target_achieved: dto.percentage_target_achieved,
        performance: dto.performance,
      },
      include: {
        kpi_templates: true,
      },
    });
  }

  async deletePillar(userId: string, userRole: UserRole, pillarId: string) {
    this.assertQacRole(userRole);
    const pillar = await this.prisma.pillarTemplate.findUnique({ where: { id: pillarId } });
    if (!pillar) throw new NotFoundException('Pillar not found');
    if (pillar.created_by_user !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.pillarTemplate.delete({ where: { id: pillarId } });
  }

  async getPillars(userId: string, userRole: UserRole) {
    this.assertQacRole(userRole);
    return await this.prisma.pillarTemplate.findMany({
      where: { created_by_user: userId },
      include: {
        kpi_templates: true,
      },
    });
  }
}
