import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../guards/ApiKeyGuard';

type Transaction = {
  tx_id: number;
  hash: string;
  ledger_index: number;
  timestamp: Date;
  amount: number;
  sender_address: string;
  receiver_address: string;
};

@Controller('api')
export class ApiController {
  @Post()
  @UseGuards(ApiKeyGuard)
  createTransaction(@Body() transaction: Transaction) {
    // Handle the transaction here
    console.log(transaction);
  }
}
