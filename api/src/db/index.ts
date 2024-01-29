import * as pgPromise from 'pg-promise'; // pg-promise core library
import { Diagnostics } from './diagnostics'; // optional diagnostics
import { IInitOptions, IDatabase, IMain } from 'pg-promise';
import {
  IExtensions,
  TransactionsRepository,
  WalletsRepository,
} from './repos';

// See https://github.com/vitaly-t/pg-promise-demo/

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.transactions = new TransactionsRepository(obj, pgp);
    obj.wallets = new WalletsRepository(obj, pgp);
  },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp({
  host: '',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
});

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
export { db, pgp };
