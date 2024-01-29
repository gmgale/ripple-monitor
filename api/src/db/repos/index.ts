import { TransactionsRepository } from './transactions';
import { WalletsRepository } from './wallets';

// Database Interface Extensions:
interface IExtensions {
  transactions: TransactionsRepository;
  wallets: WalletsRepository;
}

export { IExtensions, TransactionsRepository, WalletsRepository };
