# CWM DAO Frontend

To start the frontend:
1. `cd` to the frontend directory of this project
2. Run `npm` to install the necessary dependencies
3. `npm start` to startup the webserver
4. Visit `localhost:3000` in your browser to interact with the browser Dapp and the contract running on your local Hardhat blockchain.

Read the following section to understand how the frontend interacts with the hardhat backend from the main directory of this repository.

# Intro from `Boilerplate React Typescript Ethers.js Hardhat Project (Frontend)`

If you haven't already read the Hardhat README for this project, checkout the Hardhat [README.md](https://github.com/ChainShot/hardhat-ethers-react-ts-starter/tree/main/README.md) first and then come back to this README file.

This Dapp was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the Typescript template. Additionally it makes use of the popular [@web3-react](https://www.npmjs.com/package/web3-react) npm package. The Metamask integration code found in this Dapp is heavily based on the code found in the [@web3-react example project](https://github.com/NoahZinsmeister/web3-react/tree/v6/example). For simplicity only the Metamask (injected) blockchain provider is used in this Dapp.

The Dapp is a simple, but complete React Dapp that interacts with a locally run smart contracts for developers new to web3. It introduces the developer to the following:
1. How to use React and the [@web3-react](https://github.com/NoahZinsmeister/web3-react) npm package to connect to Metamask and display data regarding the connected Metamask wallet in the UI, such as the connected wallet's address, balance and nonce.
3. How to deploy a new instance of a contract to the local Hardhat blockchain from the UI.
4. How to perform a read-only call to the blockchain and display data stored on the blockchain in the UI.
5. How to update the state of the local blockchain by updating the contract's message via a transaction from the UI.
6. How to keep the data of the connected wallet up-to-date by listening to new block events via ethers.js as new blocks are mined.