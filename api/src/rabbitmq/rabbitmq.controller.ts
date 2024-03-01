import { Controller, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { Logger } from '@nestjs/common';

@Controller()
export class RabbitmqController implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  onModuleInit() {
    this.rabbitMQService.consumeQueue('transactions', (msg) => {
      Logger.log(`Received message: ${msg}`);
      // Process your message here
    });
  }
}
