import { Module } from '@nestjs/common';
import { ListenerController } from './listener.controller';
import { ListenerService } from './listener.service';
import { RabbitMQProducerService } from '../rabbitmq-producer/rabbitmq-producer.service';

@Module({
  controllers: [ListenerController],
  providers: [ListenerService, RabbitMQProducerService],
})
export class ListenerModule {}
