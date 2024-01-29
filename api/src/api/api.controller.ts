import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../guards/ApiKeyGuard';
import { ApiService } from './api.service';
import { db } from '../db';

@Controller('api')
export class ApiController {
  @Post('add-transaction')
  @UseGuards(ApiKeyGuard)
  createTransaction(@Body() transaction: unknown) {
    // Check the transaction matches the expected format
    if (ApiService.isTransaction(transaction)) {
      // Handle the transaction here
      ApiService.storeTransaction(transaction);
    } else {
      // Handle the error here
      Logger.error('Invalid transaction');
    }
  }

  @Post('add-wallet')
  @UseGuards(ApiKeyGuard)
  async addWallet(@Body() wallet: unknown) {
    // Check the transaction matches the expected format
    if (ApiService.isWallet(wallet)) {
      // Handle the transaction here
      await db.wallets.add(wallet);

      // Send to the listener service
      ApiService.listenToNewWallet(wallet);
    } else {
      // Handle the error here
      Logger.error('Invalid wallet');
    }
  }
}
