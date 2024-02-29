import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Controller()
export class AppController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get()
  async consumeMessages() {
    await this.rabbitMQService.consumeQueue('transactions', (msg) => {
      console.log(`Received message: ${msg}`);
      // Process your message here
    });
  }
}
