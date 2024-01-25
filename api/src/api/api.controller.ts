import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../guards/ApiKeyGuard';
import { Transaction } from './transaction';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  @Post()
  @UseGuards(ApiKeyGuard)
  createTransaction(@Body() transaction: Transaction) {
    // Check the transaction matches the expected format
    if (ApiService.isTransaction(transaction)) {
      // Handle the transaction here
      ApiService.storeTransaction(transaction);
    } else {
      // Handle the error here
      console.log('Invalid transaction format');
    }
  }
}
