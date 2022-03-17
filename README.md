# hardhat-erc20

This is a basic erc20 dApp built with Hardhat and React and Redux.

**How it works**

In the backend, there is an erc-20 smart contract. The owner of the contract gets the initial balance when deploy and can send tokens in a transaction. Also, anyone can get information about the token: for example the name, symbol and total supply.

In the frontend, the user can see three pages: home, network information and token information.

## Requirements

- **node** and **npm**

Docs: https://nodejs.org/en/

## Setup

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

- MetaMask - RPC Error

  ```
  MetaMask - RPC Error: [ethjs-query] while formatting outputs from RPC '{"value":{"code":-32603,"data":{"code":-32000,"message":"Nonce too high. Expected nonce to be 1 but got 4. Note that transactions can't be queued when automining."}}}'
  ```

If you are using Metamask and get this error, reset your Metamask account: go to `Settings > Advanced > Reset Account` and then hard reload the browser.
