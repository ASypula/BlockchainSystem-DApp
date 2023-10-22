import json

def save_ABI(path, target):
    f = open(path)
    new_file = open(target, "w")
    full = json.load(f)
    abi = json.dumps(full['abi'])
    new_file.write(abi)
    new_file.close()
    f.close()

target_data = "./app/src/blockchain/contractsABI/abi_data.json"
path_data = "./app/src/blockchain/build/contracts/DataContract.json"
target_accounts = "./app/src/blockchain/contractsABI/abi_accounts.json"
path_accounts = "./app/src/blockchain/build/contracts/AccountContract.json"
save_ABI(path_data, target_data)
save_ABI(path_accounts, target_accounts)