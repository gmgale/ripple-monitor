import {TransactionsRepository} from './transactions';

// Database Interface Extensions:
interface IExtensions {
  users: TransactionsRepository,
}

export {
  IExtensions,
  TransactionsRepository,
};
