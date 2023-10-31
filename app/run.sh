#!/bin/bash

cd src/blockchain

echo "Started contract migration with truffle"
migration_output=$(truffle migrate)
echo "Contracts successfully migrated"


contract_addresses=()
while read -r line; do
    if [[ $line =~ contract\ address:\ +([[:alnum:]]+) ]]; then
        contract_addresses+=("${BASH_REMATCH[1]}")
    fi
done <<< "$migration_output"

data_contract="${contract_addresses[0]}"
account_contract="${contract_addresses[1]}"
echo "Contract's addresses saved"
echo "Data Contract: ${data_contract}"
echo "Account Contract: ${account_contract}"

cd ../..
echo "-----------------------------------------"
echo "Updating new addresses of contracts"
sed -i "s/const contractAddressData = \"[^\"]*\";/const contractAddressData = \"$data_contract\";/" src/App.js
sed -i "s/const contractAddressAccounts = \"[^\"]*\";/const contractAddressAccounts = \"$account_contract\";/" src/App.js

python src/blockchain/contractsABI/get_abi.py

echo "Preparing to run the application"
npm start
