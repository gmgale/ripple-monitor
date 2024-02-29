import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListenerModule } from './listener/listener.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQProducerService } from './rabbitmq-producer/rabbitmq-producer.service';

@Module({
  imports: [
    ListenerModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', 'test/testWallets'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMQProducerService],
})
export class AppModule {}
