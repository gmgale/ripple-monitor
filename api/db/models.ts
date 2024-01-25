export interface ITransaction {
  hash: string;
  ledger_index: number;
  timestamp: Date;
  amount: number;
  sender_address: string;
  receiver_address: string;
}
