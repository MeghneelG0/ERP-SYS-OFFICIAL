import { Module } from '@nestjs/common';
import { PillarController } from './pillar/pillar.controller';
import { PillarService } from './pillar/pillar.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PillarController],
  providers: [PillarService],
  imports: [PrismaModule],
})
export class QcModule {}
