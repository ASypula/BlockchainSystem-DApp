import json

def save_ABI(path, target):
    f = open(path)
    new_file = open(target, "w")
    full = json.load(f)
    abi = json.dumps(full['abi'])
    new_file.write(abi)
    new_file.close()
    f.close()

target = "./app/src/blockchain/contractsABI/abi_data.json"
path = "./app/src/blockchain/build/contracts/DataContract.json"
# target = "./app/src/blockchain/build/contracts/abi_accounts.json"
# path = "./app/src/blockchain/build/contracts/AccountContract.json"
save_ABI(path, target)