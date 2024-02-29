import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQProducerService } from '../rabbitmq-producer/rabbitmq-producer.service';
import { Client, Transaction } from 'xrpl';
import * as process from 'process';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');

@Injectable()
export class ListenerService {
  constructor(
    private readonly rabbitMQProducerService: RabbitMQProducerService,
  ) {}

  client: Client;

  async startListening() {
    this.client = new xrpl.Client(process.env.XRPL_CLIENT);
    await this.client.connect();

    const addresses = this.getAddresses();
    await this.listen();
    await this.subscribe(addresses);
    Logger.log('Listening for transactions ✅');
  }

  async listen() {
    this.client.connection.on('transaction', (tx: Transaction) => {
      // this.processTransactionAPI(tx);
      this.processTransactionQueue(tx);
    });
  }

  async processTransactionAPI(tx: any) {
    const data = JSON.stringify({
      hash: tx.transaction.hash,
      ledger_index: tx.ledger_index,
      timestamp: tx.close_time_iso,
      amount: tx.transaction.Amount,
      fee: tx.transaction.Fee,
      sender_address: tx.transaction.Account,
      receiver_address: tx.transaction.Destination,
    });

    const baseUrl = process.env.API_BASE_URL;
    const endpoint = process.env.API_ENDPOINT;

    if (!baseUrl || !endpoint) {
      throw Error('Missing environment variables');
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + endpoint,
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

  async subscribe(accounts: Array<string>): Promise<void> {
    for (const acc of accounts) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await this.client.connection.request({
          command: 'subscribe',
          accounts: [acc],
        });
      } catch (error) {
        Logger.log({
          error: error.data.error_message,
          account: error.data.request.accounts,
        });
      }
    }

    Logger.log('Subscribed to accounts: ' + accounts);
  }
  catch(error: { data: { error_message: any } }) {
    Logger.log({
      error: error.data.error_message,
    });
  }

  getAddresses(): string[] {
    // TODO: Get the addresses from the database
    const testAddress = process.env.WALLET_1_ADDRESS;
    Logger.log('testAddress: ' + testAddress);
    // @ts-expect-error process.env is possible undefined
    return [testAddress];
  }

  async stopListening() {
    await this.client.disconnect();
    Logger.log('Client disconnected');
  }

  private async processTransactionQueue(tx: Transaction) {
    await this.rabbitMQProducerService.sendMessage(
      'transactions',
      JSON.stringify(tx),
    );
    return 'Message sent successfully';
  }
}
