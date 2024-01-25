import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApiModule, ConfigModule.forRoot()],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
