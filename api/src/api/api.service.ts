import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from './transaction';
import { db } from '../db';
import { Wallet } from './wallet';
import process from 'process';
import axios from 'axios';

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

  static isWallet(wallet: any): wallet is Wallet {
    return wallet && typeof wallet === 'object' && 'address' in wallet;
  }

  static listenToNewWallet(wallet: Wallet) {
    const data = JSON.stringify({
      address: wallet.address,
    });

    const listenerUrl = process.env.LISTENER_URL;

    if (!listenerUrl) {
      throw Error('Missing environment variable LISTENER_URL');
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: listenerUrl,
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.API_KEY,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response: { data: any }) => {
        Logger.log(response.data);
      })
      .catch((error: any) => {
        Logger.log(error);
      });
  }
}
