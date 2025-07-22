import { Module } from '@nestjs/common';
import { PillarService } from './pillar.service';
import { PillarController } from './pillar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PillarController],
  providers: [PillarService],
})
export class PillarModule {}
