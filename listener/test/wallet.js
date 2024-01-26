// wallet.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { XrplClient, XrplNetwork, XrplWallet } = require('xrpl');
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config(); // Load environment variables from .env file

async function fundWallet(walletAddress) {
  try {
    // Connect to the XRP Ledger (Testnet in this example)
    const client = new XrplClient(XrplNetwork.Test);
    await client.connect();
    console.log('Connected to XRP Ledger');

    // Use the XRP Testnet Faucet to fund the wallet
    console.log(`Requesting Test XRP for wallet: ${walletAddress}`);
    const faucetResponse = await client.fundWallet(walletAddress);
    console.log('Faucet response:', faucetResponse);

    // Disconnect from the XRP Ledger
    await client.disconnect();
    console.log('Disconnected from XRP Ledger');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  try {
    // Generate a new wallet
    const wallet = XrplWallet.generate();
    console.log('Wallet address:', wallet.address);

    // Write the wallet address to .env file
    dotenv.config(); // Reload .env file
    fs.writeFileSync('.env.test', `TEST_WALLET_ADDRESS=${wallet.address}`);

    // Fund the wallet
    await fundWallet(wallet.address);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
