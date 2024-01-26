/*
    Creates table transactions.
*/
CREATE TABLE transactions
(
    tx_id SERIAL PRIMARY KEY,
    hash VARCHAR(64) UNIQUE,
    ledger_index BIGINT,
    timestamp TIMESTAMPTZ,
    amount DECIMAL(20, 10),
    fee VARCHAR(64),
    sender_address VARCHAR(64),
    receiver_address VARCHAR(64)
);

