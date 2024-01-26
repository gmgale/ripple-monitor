/* eslint-disable @typescript-eslint/no-var-requires */
// transaction.js
const xrpl = require('xrpl');
const dotenv = require('dotenv');

dotenv.config({ path: './test/.env.test' }); // Load environment variables from .env.test file

// Connect to the XRP Ledger (Testnet in this example)
const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');

async function main() {
  try {
    await client.connect();
    console.log('Connected to XRP Ledger');

    const wallet1 = xrpl.Wallet.fromSeed(process.env.WALLET_1_SEED);
    const wallet2 = xrpl.Wallet.fromSeed(process.env.WALLET_2_SEED);

    console.log(wallet1.address);
    console.log(wallet2.address);

    // Create a Payment transaction from wallet1 to wallet2
    const transaction = await client.autofill({
      TransactionType: 'Payment',
      Account: wallet1.address,
      Amount: xrpl.dropsToXrp('1000000'), // 1,000,000 drops = 1 XRP
      Destination: wallet2.address,
    });

    try {
      await client.autofill(transaction);
      const { tx_blob: signed_tx_blob, hash } = wallet1.sign(transaction);
      // Logger.log(signed_tx_blob, "TxService");
    } catch (error) {
      console.error(`Failed to sign transaction: ${error}`);
    }

    // Sign prepared instructions ------------------------------------------------
    const signed = wallet1.sign(transaction);

    const result = await client.submitAndWait(signed.tx_blob);
    console.log('Test script: Transaction successful! ✅');
    console.log(result.result);

    // Disconnect from the XRP Ledger
    await client.disconnect();
    console.log('Disconnected from XRP Ledger');
  } catch (error) {
    console.error('Error:', error);
    await client.disconnect();
    process.exit(1);
  }
}

main();
