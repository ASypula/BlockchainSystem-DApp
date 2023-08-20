const DataContract = artifacts.require("DataContract");
const truffleAssert = require("truffle-assertions");
//TODO: Add info about truffle-assertions and about solidity-coverage
contract("DataContractTestShips", (accounts) => {
  it("Adding one ship", async () => {
    const contractInstance = await DataContract.deployed();
    const shipName = "ship1";

    const tx = await contractInstance.addShip(shipName);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return ev.text === "Ship added successfully" && ev.value === shipName;
    });
  });

  it("Adding second ship", async () => {
    const contractInstance = await DataContract.deployed();
    const shipName = "ship2";

    const tx = await contractInstance.addShip(shipName);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return ev.text === "Ship added successfully" && ev.value === shipName;
    });
  });

  it("Already exisiting ship error", async function () {
    const contractInstance = await DataContract.deployed();
    const shipName = "ship1";

    try {
      const tx = await contractInstance.addShip(shipName);
    } catch (e) {
      return true;
    }
  });
});

contract("DataContractTestParts", (accounts) => {
  const shipName = "ship1";
  it("Adding one part", async () => {
    const contractInstance = await DataContract.deployed();
    const partName = "part1";

    let tx = await contractInstance.addShip(shipName);
    tx = await contractInstance.addPart(shipName, partName);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Part added successfully to ship" && ev.value === partName
      );
    });
  });

  it("Adding second part", async () => {
    const contractInstance = await DataContract.deployed();
    const partName = "part2";

    const tx = await contractInstance.addPart(shipName, partName);
    truffleAssert.eventEmitted(tx, "LogData", (ev) => {
      return (
        ev.text === "Part added successfully to ship" && ev.value === partName
      );
    });
  });

  it("Already exisiting part in ship error", async function () {
    const contractInstance = await DataContract.deployed();
    const partName = "part1";

    try {
      const tx = await contractInstance.addPart(shipName, partName);
    } catch (e) {
      return true;
    }
  });
});
