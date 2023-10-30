#!/bin/bash

cd src/blockchain
migration_output=$(truffle migrate)

# # Use a regex to find all occurrences of contract addresses

contract_addresses=()
while read -r line; do
    if [[ $line =~ contract\ address:\ +([[:alnum:]]+) ]]; then
        contract_addresses+=("${BASH_REMATCH[1]}")
    fi
done <<< "$migration_output"

data_contract="${contract_addresses[0]}"
account_contract="${contract_addresses[1]}"

cd ../..
python src/blockchain/contractsABI/get_abi.py
echo "Well done"
