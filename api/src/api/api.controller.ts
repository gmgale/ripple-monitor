import { Body, Controller, Post } from '@nestjs/common';

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
  createTransaction(@Body() transaction: Transaction) {
    // Handle the transaction here
    console.log(transaction);
  }
}
