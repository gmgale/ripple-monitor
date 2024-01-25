import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction';

@Injectable()
export class ApiService {
  static isTransaction(obj: any): obj is Transaction {
    return (
      typeof obj === 'object' &&
      'tx_id' in obj &&
      'hash' in obj &&
      'ledger_index' in obj &&
      'timestamp' in obj &&
      'amount' in obj &&
      'sender_address' in obj &&
      'receiver_address' in obj
    );
  }

  static storeTransaction(transaction: Transaction) {
    // Handle the transaction here
    console.log(transaction);
  }
}
