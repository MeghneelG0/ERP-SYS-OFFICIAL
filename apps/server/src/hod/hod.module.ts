import { Module } from '@nestjs/common';
import { DepartmentInfoController } from './department-info/department-info.controller';
import { DepartmentInfoService } from './department-info/department-info.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DepartmentInfoController],
  providers: [DepartmentInfoService],
  imports: [PrismaModule],
})
export class HodModule {}
