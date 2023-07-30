import Logger from "./Logger";

const logger = new Logger();

export async function addShipContract(account, contract, name) {
    return contract.methods.addShip(name).send({ from: account });
}

export async function addPartContract(account, contract, shipName, partName){
    await contract.methods.addPart(shipName, partName).send({ from: account });
    logger.log(`New part ${partName} added to ship ${shipName} to blockchain.`);
}

export async function addRecordContract(account, contract, shipName, partName, record){
    await contract.methods.addRecord(shipName, partName, record).send({ from: account, gas: 194000 });
    logger.log(`New record ${record} added to part ${partName} in ship ${shipName} to blockchain.`);
}

export async function getShipNames(contract){
    let names = await contract.methods.getAllShips().call();
    return names
}

export async function getShipPartNames(contract, shipName){
    let names = await contract.methods.getAllShipParts(shipName).call();
    return names
}

//TODO: when const and when let for returned values
export async function getLastRecords(contract, shipName) {
    const result = await contract.methods.getLatestRecords(shipName).call();
    const partNames = result[0]; 
    const latestRecords = result[1]; 
    return [partNames, latestRecords];
}
