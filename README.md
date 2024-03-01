Terminal 1:
Generate 2 wallets and fund
    cd listener
    npm run wallet

Terminal 2:
Spin up DB, RabbitMQ, API and Listener services
    // ./
    make dev-run

Terminal 1:
Create a transaction
    // ./listener
    npm run transaction

