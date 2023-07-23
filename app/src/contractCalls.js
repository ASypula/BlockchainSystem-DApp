export async function tryContract1(account, contract, name){
    await contract.methods.addShip(name).send({ from: account });
    console.log('New ship added');
    let result = await contract.methods.getShipName(0).call();
    console.log(result);
    await contract.methods.addRecord("one", "two", "three").send({ from: account, gas: 194000});
    let result2 = await contract.methods.getRecord("one", "two").call();
    console.log(result2);
}

export async function getShipNames(contract){
    let names = await contract.methods.getAllShips().call();
    return names
}
