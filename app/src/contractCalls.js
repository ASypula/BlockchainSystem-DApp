import Logger from "./Logger";

const logger = new Logger();

// Functions that interact directly with deployed contract
// using either send or call methods

export async function getPermittedAccounts(contract, account) {
  try {
    logger.log("From contract function, loading permitted accounts data.");
    const accounts = await contract.methods
      .getAllAccounts()
      .call({ from: account });
    logger.log(
      "From contract function, permitted accounts loaded successfully"
    );
    return accounts;
  } catch (error) {
    logger.error("From contract function, permitted accounts load failed");
    throw error;
  }
}

export async function addShipContract(account, contract, name) {
  logger.log("From contract function, adding new ship.");
  return contract.methods.addShip(name).send({ from: account });
}

export async function addPartContract(account, contract, shipName, partName) {
  logger.log("From contract function, adding new part.");
  return contract.methods.addPart(shipName, partName).send({ from: account });
}

export async function addRecordContract(
  account,
  contract,
  shipName,
  partName,
  date,
  descr,
  file
) {
  logger.log("From contract function, adding new record.");
  await contract.methods
    .addRecord(shipName, partName, date, descr, file)
    .send({ from: account, gas: 2094000 });
  logger.log(
    `New record added to part ${partName} in ship ${shipName} to blockchain.`
  );
}

export async function getShipNames(contract) {
  logger.log("From contract function, loading ship names.");
  const names = await contract.methods.getAllShips().call();
  return names;
}

export async function getShipPartNames(contract, shipName) {
  logger.log("From contract function, loading part names.");
  const names = await contract.methods.getAllShipParts(shipName).call();
  return names;
}

export async function getLastRecords(contract, shipName) {
  logger.log("From contract function, loading most recent record.");
  const result = await contract.methods.getLatestRecords(shipName).call();
  const partNames = result[0];
  const latestRecords = result[1];
  logger.log("From contract function, last record loaded successfully.");
  return [partNames, latestRecords];
}

export async function getHistoryPartRecords(
  contract,
  shipName,
  partName,
  count
) {
  logger.log(
    `From contract function, loading ${count} last records for ${partName}.`
  );
  const result = await contract.methods
    .getPartRecords(shipName, partName, count)
    .call();
  logger.log("From contract function, history records loaded successfully.");
  return result;
}
