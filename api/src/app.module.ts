import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [ApiModule, ConfigModule.forRoot(), RabbitmqModule],
  controllers: [AppController, ApiController],
  providers: [AppService, RabbitMQService],
})
export class AppModule {}
