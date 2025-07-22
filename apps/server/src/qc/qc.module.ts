import { Module } from '@nestjs/common';
import { PillarModule } from './pillar/pillar.module';

@Module({
  imports: [PillarModule],
  exports: [PillarModule],
})
export class QcModule {}
