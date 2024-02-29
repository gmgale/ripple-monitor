import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [ApiModule, ConfigModule.forRoot()],
  controllers: [AppController, ApiController],
  providers: [AppService, RabbitMQService],
})
export class AppModule {}
