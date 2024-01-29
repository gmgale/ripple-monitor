/*
    Finds a transaction by sender_address or receiver_address
*/
SELECT * FROM transactions
WHERE sender_address = ${address} OR receiver_address = ${address}
