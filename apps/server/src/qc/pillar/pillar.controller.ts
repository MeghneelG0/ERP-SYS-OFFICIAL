import { Controller, Post, Body, UseGuards, Delete, Param, Patch, Get } from '@nestjs/common';
import { PillarService } from './pillar.service';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { RequestUser } from 'src/auth/dto/request-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Pillar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/qc/pillar')
export class PillarController {
  constructor(private readonly pillarService: PillarService) {}

  @Post()
  addPillar(@CurrentUser() user: RequestUser, @Body() dto: CreatePillarDto) {
    return this.pillarService.createPillar(user.id, user.role, dto);
  }

  @Patch(':id')
  async updatePillar(@CurrentUser() user: RequestUser, @Param('id') id: string, @Body() dto: UpdatePillarDto) {
    return this.pillarService.updatePillar(user.id, user.role, id, dto);
  }

  @Delete(':id')
  async deletePillar(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.pillarService.deletePillar(user.id, user.role, id);
  }

  @Get()
  getPillars(@CurrentUser() user: RequestUser) {
    return this.pillarService.getPillars(user.id, user.role);
  }
}
