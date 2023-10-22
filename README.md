# BlockchainSystem-DApp

### How to run

Prerequites:

- connection to Ethereum blockchain e.g. Ganache

Steps:

1. Deploy the contracts to blockchain

   ```
   cd app/src/blockchain
   truffle migrate
   python3 contractsABI/get_abi.py
   cd ../..
   ```

2. Make sure that the deployed contract's address matches the address from app/src/App.js

   ```
   // Addresses of contracts already deployed to blockchain
   const contractAddressData = "0x{DataContractAddress}";
   const contractAddressData = "0x{AccountContractAddress}";
   ```

3. Run the app
   ```
   npm start
   ```
