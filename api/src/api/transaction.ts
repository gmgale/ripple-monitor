export type Transaction = {
  tx_id: number;
  hash: string;
  ledger_index: number;
  timestamp: Date;
  amount: number;
  sender_address: string;
  receiver_address: string;
};
