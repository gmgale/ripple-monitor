import { Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  controllers: [RabbitmqController],
  providers: [RabbitMQService],
})
export class RabbitmqModule {}
