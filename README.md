
# Proxy server for RPC endpoint using Express

This project shows how to protect your RPC URL by creating a back-end server where you store the endpoint. Then, when you click the button to check the balance, the front end will send a request to the back-end server using the [Solana getBalance(https://docs.chainstack.com/reference/solana-getbalance) method via the [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) library. 

Read the full guide on the Chainstack developer portal:
* [How to store your Web3 DApp secrets: Guide to environment variables](https://docs.chainstack.com/docs/how-to-store-your-web3-dapp-secrets-guide-to-environment-variables)

## Quickstart

Clone the repository:

```sh
git clone https://github.com/akegaviar/express-proxy-server.git
```

Edit the `.env.sample` file to include your node RPC URL key and rename it to `.env`.

```env
SOLANA_RPC_URL="YOUR_CHAINSTACK_SOLANA_NODE_URL"
PORT=4000
```

Install  dependencies:

```sh
npm install
```

Run the server in dev mode with:

```sh
npm run dev
```

The server is now running on `http://localhost:4000/`. You can send balance requests to your server with the following:

```sh
curl --location 'http://localhost:4000/balance' \
--header 'Content-Type: application/json' \
--data '{"address":"52C9T2T7JRojtxumYnYZhyUmrN7kqzvCLc4Ksvjk7TxD"}'
```

You will also find a basic front end in the `src` directory. You can run it in your browser and test the proxy server.

1. Insert the address you want to query in the input field.
1. Click **Check balance** to send a request to your RPC node and retrieve the address' balance.

If you check the source code from the browser, you won't be able to find the API key used! 

## Prerequisites

* Node.js: ^16.17.0— [install Node](https://nodejs.org/en/download/)
* A node RPC endpoint.

Deploy a node with Chainstack:

1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create).  
1. [Deploy a node](https://docs.chainstack.com/platform/join-a-public-network).  
1. [View node access and credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials). 
