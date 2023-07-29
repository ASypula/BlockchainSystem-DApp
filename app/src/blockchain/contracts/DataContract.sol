pragma solidity ^0.8.2;
pragma abicoder v2;

contract DataContract {

  event Log(string text);

  struct ActionEntry {
    uint date;
    string descr;
  }

  string[] public shipNames;
  mapping(string=>string[]) partNames;
  mapping(string=>mapping(string=>ActionEntry[])) public allRecords;

  // SHIP functions

  function addShip(string memory name) public {
    shipNames.push(name);
  }

  function getShipName(uint idx) public view returns (string memory) {
    return shipNames[idx];
  }

  function getAllShips() public view returns (string[] memory){
    return shipNames;
  }

  // PART functions

  function addPart(string memory shipName, string memory partName) public {
    partNames[shipName].push(partName);
  }

  function getAllShipParts(string memory shipName) public view returns (string[] memory){
    return partNames[shipName];
  }

  // RECORD functions

  function addRecord(string memory shipName, string memory partName, string memory descr) public {
    //TODO: change date
    //TODO: check If given part and ship exists
    ActionEntry memory newEntry = ActionEntry(1, descr);
    // allRecords[shipName][partName]=new ActionEntry[];
    // partNames[shipName].push(partName);
    allRecords[shipName][partName].push(newEntry);
    emit Log("New record added");
  }

  function getRecord(string memory shipName, string memory partName) public view returns (string memory){
    return allRecords[shipName][partName][0].descr;
  }

}
