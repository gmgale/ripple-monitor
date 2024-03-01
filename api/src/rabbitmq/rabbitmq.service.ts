import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private readonly rabbitUrl: any = process.env.RABBIT_URL;

  async consumeQueue(
    queueName: string,
    callback: (msg: any) => void,
  ): Promise<void> {
    const connection = await amqp.connect(this.rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    console.log(
      `[*] Waiting for messages in ${queueName}. To exit press CTRL+C`,
    );

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        callback(msg.content.toString());
        channel.ack(msg);
      }
    });
  }
}
