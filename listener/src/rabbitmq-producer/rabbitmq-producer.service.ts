import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQProducerService {
  private readonly rabbitUrl: string =
    process.env.RABBIT_URL || 'amqp://localhost';

  async sendMessage(queueName: string, message: string): Promise<void> {
    const connection = await amqp.connect(this.rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

    console.log(`[x] Sent message: ${message}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  }
}
