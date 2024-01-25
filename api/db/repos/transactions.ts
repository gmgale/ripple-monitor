import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { ITransaction } from '../models';
import { transactions as sql } from '../sql';

export class TransactionsRepository {
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

  // Creates the table;
  create(): Promise<null> {
    return this.db.none(sql.create);
  }

  // Drops the table;
  drop(): Promise<null> {
    return this.db.none(sql.drop);
  }

  // Removes all records from the table;
  empty(): Promise<null> {
    return this.db.none(sql.empty);
  }

  // Adds a new record and returns the full object;
  // It is also an example of mapping HTTP requests into query parameters;
  add(values: {
    hash: string;
    ledger_index: number;
    timestamp: Date;
    amount: number;
    sender_address: string;
    receiver_address: string;
  }): Promise<ITransaction> {
    return this.db.one(sql.add, {
      hash: values.hash,
      ledger_index: values.ledger_index,
      timestamp: values.timestamp,
      amount: values.amount,
      sender_address: values.sender_address,
      receiver_address: values.receiver_address,
    });
  }

  // Tries to delete a transaction by id, and returns the number of records deleted;
  remove(id: number): Promise<number> {
    return this.db.result(
      'DELETE FROM transactions WHERE tx_id = $1',
      +id,
      (r: IResult) => r.rowCount,
    );
  }

  // Tries to find a transaction from sender_address and receiver_address,
  // and returns the found record;
  find(values: {
    sender_address: string;
    receiver_address: string;
  }): Promise<ITransaction> {
    return this.db.result(sql.find, {
      sender_address: values.sender_address,
      receiver_address: values.receiver_address,
    });
  }

  // Returns all transaction records;
  all(): Promise<ITransaction[]> {
    return this.db.any('SELECT * FROM transactions');
  }

  // Returns the total number of transactions;
  total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM transactions',
      [],
      (data: { count: string }) => +data.count,
    );
  }
}
