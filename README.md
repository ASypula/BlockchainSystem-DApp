# BlockchainSystem-DApp

### How to run

Prerequites:

- connection to Ethereum blockchain e.g. Ganache
- account on blockchain

Steps:
Steps vary depending if you want to:

1. deploy new contracts,
2. use the ones that are already deployed on the blockchain

##### 1. Run PartsChain with newly deployed contracts

```
cd app
bash run.sh
```

The commands will run a script run.sh which compiles and migrates the DataContract and AccountContract, then updates the files with new contracts' addresses
and finally runs the PartsChain website.

##### 2. Run PartsChain with existing contracts

```
cd app
npm start
```
