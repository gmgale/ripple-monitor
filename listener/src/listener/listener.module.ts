import { Module } from '@nestjs/common';
import { ListenerController } from './listener.controller';
import { ListenerService } from './listener.service';

@Module({
  controllers: [ListenerController],
  providers: [ListenerService],
})
export class ListenerModule {}
