import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ListenerService } from './listener.service';

@Controller('listener')
export class ListenerController implements OnModuleInit, OnModuleDestroy {
  constructor(private listenerService: ListenerService) {}

  onModuleInit() {
    this.listenerService.startListening();
  }

  onModuleDestroy() {
    this.listenerService.stopListening();
  }

  // Add a post route to the listener controller to listen to new wallets
}
