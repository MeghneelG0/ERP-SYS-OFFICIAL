import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QocModule } from './qoc/qoc.module';

@Module({
  imports: [QocModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
