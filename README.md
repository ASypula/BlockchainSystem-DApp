# BlockchainSystem-DApp

## Blockchain-enabled system for ship parts tracking and maintenance

Part of Bachelor's thesis \
Aleksandra Sypula

The purpose of the thesis is to implement a system that will store data while at the same time providing a certain security layer – preventing data deletion and modification. The system - PartsChain is designed to track the history of ship parts and their maintenance records in response to the growing market need for a reliable, cost-effective spare parts supply. The cornerstone of the solution is smart contracts deployed on the blockchain network, enabling the addition of new data through transactions that by definition cannot be deleted or modified.

PartsChain system, having applied smart contracts technology on blockchain platform, allows the data to be available worldwide. Moreover, by introducing authentication and authorization methods based on native blockchain account addresses, the users' access can be easily controlled.

The key features of the system include: the addition of new vessels, spare parts, and single records to the system (all of them as immutable data). On top of that the system offers the history of the records to authorized users. Every functionality should be available through a website with an intuitive interface.

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
