CREATE TABLE xrp_transactions (
                                  tx_id SERIAL PRIMARY KEY,
                                  hash VARCHAR(64) UNIQUE,
                                  ledger_index BIGINT,
                                  timestamp TIMESTAMP,
                                  amount DECIMAL(20, 10),
                                  sender_address VARCHAR(64),
                                  receiver_address VARCHAR(64)
);
