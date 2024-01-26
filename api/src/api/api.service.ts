import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from './transaction';
import { db } from '../../db';

@Injectable()
export class ApiService {
  static isTransaction(obj: any): obj is Transaction {
    return (
      typeof obj === 'object' &&
      'hash' in obj &&
      'ledger_index' in obj &&
      'timestamp' in obj &&
      'amount' in obj &&
      'sender_address' in obj &&
      'receiver_address' in obj
    );
  }

  static storeTransaction(transaction: Transaction) {
    db.one(
      'INSERT INTO transactions(hash, ledger_index, timestamp, amount, sender_address, receiver_address) VALUES(${hash}, ${ledger_index}, ${timestamp}, ${amount}, ${sender_address}, ${receiver_address}) RETURNING tx_id',
      transaction,
    )
      .then((data) => {
        Logger.log(data.tx_id); // print new transaction id;
      })
      .catch((error) => {
        Logger.log(error);
      });
  }
}
