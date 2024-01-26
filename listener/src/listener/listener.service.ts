import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'xrpl';
import * as process from 'process';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');

@Injectable()
export class ListenerService {
  client: Client;

  async startListening() {
    const addresses = this.getAddresses();
    await this.subscribe(addresses);
    await this.listen();
    Logger.log('Listening for transactions ✅');
  }

  async listen() {
    this.client.connection.on('transaction', (tx) => {
      // TODO: Send the transaction to the database
      console.log({ tx });
    });
  }

  async subscribe(accounts: Array<string>): Promise<void> {
    this.client = new xrpl.Client(process.env.XRPL_CLIENT);
    await this.client.connect();

    for (const acc of accounts) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await this.client.connection.request({
          command: 'subscribe',
          accounts: [acc],
        });
      } catch (error) {
        console.log({
          error: error.data.error_message,
          account: error.data.request.accounts,
        });
      }
    }

    Logger.log('Subscribed to accounts: ' + accounts);
  }
  catch(error: { data: { error_message: any } }) {
    console.log({
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
}
