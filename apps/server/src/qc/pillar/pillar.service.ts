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
    return this.prisma.pillarTemplate.create({
      data: {
        ...dto,
        created_by_qac: userId,
      },
    });
  }

  async updatePillar(userId: string, userRole: UserRole, pillarId: string, dto: UpdatePillarDto) {
    this.assertQacRole(userRole);
    const pillar = await this.prisma.pillarTemplate.findUnique({ where: { id: pillarId } });
    if (!pillar) throw new NotFoundException('Pillar not found');
    if (pillar.created_by_qac !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.pillarTemplate.update({
      where: { id: pillarId },
      data: dto,
    });
  }

  async deletePillar(userId: string, userRole: UserRole, pillarId: string) {
    this.assertQacRole(userRole);
    const pillar = await this.prisma.pillarTemplate.findUnique({ where: { id: pillarId } });
    if (!pillar) throw new NotFoundException('Pillar not found');
    if (pillar.created_by_qac !== userId) throw new ForbiddenException('Not allowed');
    return this.prisma.pillarTemplate.delete({ where: { id: pillarId } });
  }

  async getPillars(userId: string, userRole: UserRole) {
    this.assertQacRole(userRole);
    return this.prisma.pillarTemplate.findMany({ where: { created_by_qac: userId } });
  }
}
