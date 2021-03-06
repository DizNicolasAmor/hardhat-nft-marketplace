# hardhat-nft-marketplace

This is a basic NFK Marketplace dApp built with Hardhat and React and Redux.

**How it works**

In the backend:

- the user is able to create a NFT and publish it on the marketplace.
- the user is able to but an NFT published on the marketplace.
- the user is able to resell an NFT on the marketplace.

In the frontend:

- home page: the user is able to see the list of NFT items of the Marketplace and buy an item.
- profile page: the user is able to see their own items.
- create page: the user is able to create an NFT.

## Requirements

- **node** and **npm**

Docs: https://nodejs.org/en/

## Setup

### Quick setup

I have already deployed a contract in Kovan Testnet, so you can only run the frontend side and then connect to Kovan blockchain.

### Set environment variables

- In the backend directory, create an `.env` file. Copy the info from `.env.example` and replace the values with your environment variables.
- In the frontend directory, create an `.env.local` file. Copy the info from `.env.local.example` and replace the values with your environment variables.

### Set up backend locally with Hardhat Network

```
# first, go to backend directory
$ cd backend/

# second, if it is the first time, install dependencies
$ npm ci

# third, run a Hardhat Network local node
$ npx hardhat node
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

# fourth, create an .env file, similar to .env.example and replace the values with your environment variables.

# fifth, in a different console, run the deploy script against this local node
npx hardhat run scripts/deploy.js --network localhost
```

Docs: https://hardhat.org/getting-started/

### Set up MetaMask to connect this local node

Add a network in your MetaMask settings with the following configuration:

```
Network name: LOCALHOST
NEW RPC URL: http://127.0.0.1:8545
Chain ID: 31337
```

### Set up frontend with ReactJS

```
# first, go to the frontend directory
$ cd frontend/

# second, if it is the first time, install dependencies
$ npm ci

# third, run frontend
$ npm run dev
```

## Known issues

- MetaMask - configurate localhost network

  ```
  Network Name:     Localhost 8545
  New RPC URL:      http://localhost:8545
  Chain ID:         31337
  Currency Symbol:  local ETH
  ```

- MetaMask - RPC Error

  ```
  MetaMask - RPC Error: [ethjs-query] while formatting outputs from RPC '{"value":{"code":-32603,"data":{"code":-32000,"message":"Nonce too high. Expected nonce to be 1 but got 4. Note that transactions can't be queued when automining."}}}'
  ```

If you are using Metamask and get this error, reset your Metamask account: go to `Settings > Advanced > Reset Account` and then hard reload the browser.
