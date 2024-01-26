/* eslint-disable @typescript-eslint/no-var-requires */
// wallet.js
const xrpl = require('xrpl');
const dotenv = require('dotenv');
const fs = require('fs');
const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
const envPath = './test/.env.test';

console.log('Connected to XRP Ledger');

async function fundWallet(wallet) {
  try {
    // Use the XRP Testnet Faucet to fund the wallet
    console.log(`Requesting Test XRP for wallet: ${wallet.classicAddress}`);
    const faucetResponse = await client.fundWallet(wallet);
    console.log('Faucet response:', faucetResponse);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function generateAndFundWallet(walletIndex) {
  try {
    // Generate a new wallet
    const wallet = xrpl.Wallet.generate();
    console.log(`Generated wallet: ${wallet.classicAddress}`);

    // Write the wallet address to .env file
    dotenv.config({ path: envPath }); // Reload .env file

    // overwrite the TEST_WALLET_ADDRESS variable
    fs.writeFileSync(
      envPath,
      `WALLET_${walletIndex}_ADDRESS=${wallet.classicAddress}\nWALLET_${walletIndex}_SEED=${wallet.seed}\n`,
      {
        flag: 'a',
      },
    );

    // Fund the wallet
    await fundWallet(wallet);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  try {
    // Load the .env.test file
    dotenv.config({ path: envPath });

    await client.connect();

    // Generate and fund two wallets
    for (let i = 1; i <= 2; i++) {
      await generateAndFundWallet(i);
    }
    await client.disconnect();
    console.log('Disconnected from XRP Ledger');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
