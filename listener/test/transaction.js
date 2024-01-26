// transaction.js
const {
  XrplClient,
  XrplNetwork,
  XrplWallet,
  XrplTransaction,
  XrplAmount,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('xrpl');
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env.test file

async function main() {
  try {
    const walletAddress = process.env.TEST_WALLET_ADDRESS;

    // Connect to the XRP Ledger (Testnet in this example)
    const client = new XrplClient(XrplNetwork.Test);
    await client.connect();
    console.log('Connected to XRP Ledger');

    // Generate a new wallet
    const wallet2 = XrplWallet.generate();
    console.log('Wallet 2 address:', wallet2.address);

    // Create a Payment transaction from wallet1 to wallet2
    const paymentTx = new XrplTransaction.Payment({
      account: walletAddress,
      amount: new XrplAmount('1000000 drops'), // Sending 1 XRP
      destination: wallet2.address,
    });

    // Sign the transaction with wallet1's secret
    paymentTx.sign(process.env.WALLET_SECRET);

    // Submit the transaction to the XRP Ledger
    const submissionResult = await client.submitTransaction(paymentTx);
    console.log('Transaction submitted...');
    console.log('Transaction result:', submissionResult);
    console.log('Transaction hash:', submissionResult.hash);

    // Disconnect from the XRP Ledger
    await client.disconnect();
    console.log('Disconnected from XRP Ledger');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
