export type Transaction = {
  hash: string;
  ledger_index: number;
  timestamp: Date;
  amount: number;
  fee: string;
  sender_address: string;
  receiver_address: string;
};
