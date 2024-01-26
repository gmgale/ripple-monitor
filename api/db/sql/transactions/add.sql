/*
    Adds a new transaction to the database
*/
INSERT INTO transactions(hash, ledger_index, timestamp, amount, fee, sender_address, receiver_address)
VALUES (${hash}, ${ledger_index}, ${timestamp}, ${amount}, ${fee}, ${sender_address}, ${receiver_address})
RETURNING *;
