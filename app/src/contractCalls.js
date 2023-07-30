import Logger from "./Logger";

const logger = new Logger();

export async function addShipContract(account, contract, name) {
  return contract.methods.addShip(name).send({ from: account });
}

export async function addPartContract(account, contract, shipName, partName) {
  return contract.methods.addPart(shipName, partName).send({ from: account });
}

export async function addRecordContract(
  account,
  contract,
  shipName,
  partName,
  date,
  descr
) {
  await contract.methods
    .addRecord(shipName, partName, date, descr)
    .send({ from: account, gas: 194000 });
  logger.log(
    `New record added to part ${partName} in ship ${shipName} to blockchain.`
  );
}

export async function getShipNames(contract) {
  let names = await contract.methods.getAllShips().call();
  return names;
}

export async function getShipPartNames(contract, shipName) {
  let names = await contract.methods.getAllShipParts(shipName).call();
  return names;
}

//TODO: when const and when let for returned values
export async function getLastRecords(contract, shipName) {
  const result = await contract.methods.getLatestRecords(shipName).call();
  const partNames = result[0];
  const latestRecords = result[1];
  return [partNames, latestRecords];
}
