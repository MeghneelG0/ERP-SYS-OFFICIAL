import { Module } from '@nestjs/common';
import { QacService } from './qac.service';
import { QacController } from './qac.controller';

@Module({
  providers: [QacService],
  controllers: [QacController],
})
export class QacModule {}
