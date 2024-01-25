import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiKeyGuard } from '../guards/ApiKeyGuard';

@Module({
  controllers: [ApiController],
  providers: [ApiService, ApiKeyGuard],
})
export class ApiModule {}
