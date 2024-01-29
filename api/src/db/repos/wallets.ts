import { IDatabase, IMain } from 'pg-promise';
import { IWallet } from '../models';
import { transactions as sql } from '../sql';

export class WalletsRepository {
  /**
   * @param db
   * Automated database connection context/interface.
   *
   * If you ever need to access other repositories from this one,
   * you will have to replace type 'IDatabase<any>' with 'any'.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(
    private db: IDatabase<any>,
    private pgp: IMain,
  ) {
    /*
      If your repository needs to use helpers like ColumnSet,
      you should create it conditionally, inside the constructor,
      i.e. only once, as a singleton.
    */
  }

  // Adds a new record and returns the full object;
  // It is also an example of mapping HTTP requests into query parameters;
  add(values: { address: string }): Promise<IWallet> {
    return this.db.one(sql.add, {
      address: values.address,
    });
  }
}
