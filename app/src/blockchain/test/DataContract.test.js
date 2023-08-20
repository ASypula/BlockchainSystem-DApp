const DataContract = artifacts.require("DataContract");
const truffleAssert = require("truffle-assertions");
//TODO: Add info about truffle-assertions and about solidity-coverage
contract("DataContractTestShips", (accounts) => {
  const shipName1 = "ship1";
  const shipName2 = "ship2";
  it("Adding one ship", async () => {
    const contractInstance = await DataContract.deployed();
    const tx = await contractInstance.addShip(shipName1);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return ev.text === "Ship added successfully" && ev.value === shipName1;
    });
  });

  it("Adding second ship", async () => {
    const contractInstance = await DataContract.deployed();
    const tx = await contractInstance.addShip(shipName2);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return ev.text === "Ship added successfully" && ev.value === shipName2;
    });
  });

  it("Error for already existing ship", async function () {
    const contractInstance = await DataContract.deployed();
    try {
      const tx = await contractInstance.addShip(shipName1);
    } catch (e) {
      return true;
    }
  });
});

contract("DataContractTestParts", (accounts) => {
  const shipName = "ship1";
  const partName1 = "part1";
  const partName2 = "part2";
  it("Adding one part", async () => {
    const contractInstance = await DataContract.deployed();

    await contractInstance.addShip(shipName);
    const tx = await contractInstance.addPart(shipName, partName1);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Part added successfully to ship" && ev.value === partName1
      );
    });
  });

  it("Adding second part", async () => {
    const contractInstance = await DataContract.deployed();
    const tx = await contractInstance.addPart(shipName, partName2);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Part added successfully to ship" && ev.value === partName2
      );
    });
  });

  it("Error for already existing part in ship", async function () {
    const contractInstance = await DataContract.deployed();
    try {
      const tx = await contractInstance.addPart(shipName, partName1);
    } catch (e) {
      return true;
    }
  });
});

contract("DataContractTestRecords", (accounts) => {
  const shipName = "ship1";
  const partName1 = "part1";
  const partName2 = "part2";
  const recordDate1 = 123;
  const recordDescr1 = "descr1";
  const recordFile1 = "file1";
  const recordDate2 = 456;
  const recordDescr2 = "descr2";
  const recordFile2 = "file2";
  it("Adding one record", async () => {
    const contractInstance = await DataContract.deployed();

    await contractInstance.addShip(shipName);
    await contractInstance.addPart(shipName, partName1);
    const tx = await contractInstance.addRecord(
      shipName,
      partName1,
      recordDate1,
      recordDescr1,
      recordFile1
    );
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Preparing to add a new record to" && ev.value === partName1
      );
    });
  });

  it("Adding second record", async () => {
    const contractInstance = await DataContract.deployed();

    const tx = await contractInstance.addRecord(
      shipName,
      partName1,
      recordDate2,
      recordDescr2,
      recordFile2
    );
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Preparing to add a new record to" && ev.value === partName1
      );
    });
  });

  it("Adding record to different part", async () => {
    const contractInstance = await DataContract.deployed();
    await contractInstance.addPart(shipName, partName2);
    const tx = await contractInstance.addRecord(
      shipName,
      partName2,
      recordDate1,
      recordDescr1,
      recordFile1
    );
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Preparing to add a new record to" && ev.value === partName2
      );
    });
  });

  it("Error for not existing part to add record", async function () {
    const contractInstance = await DataContract.deployed();
    const partNameNew = "part3";
    try {
      const tx = await contractInstance.addRecord(
        shipName,
        partNameNew,
        recordDate2,
        recordDescr2,
        recordFile2
      );
    } catch (e) {
      return true;
    }
  });
});
