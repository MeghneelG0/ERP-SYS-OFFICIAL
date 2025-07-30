import { Module } from '@nestjs/common';
import { PillarController } from './pillar/pillar.controller';
import { PillarService } from './pillar/pillar.service';
import { KpiController } from './kpi/kpi.controller';
import { KpiService } from './kpi/kpi.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PillarController, KpiController],
  providers: [PillarService, KpiService],
  imports: [PrismaModule],
})
export class QcModule {}
