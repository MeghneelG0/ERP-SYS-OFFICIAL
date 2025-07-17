import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QacModule } from './qac/qac.module';

@Module({
  imports: [QacModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
