import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListenerModule } from './listener/listener.module';

@Module({
  imports: [ListenerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
