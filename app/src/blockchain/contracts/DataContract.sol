pragma solidity ^0.5.0;

contract DataContract {

  event Log(string text);

  struct ActionEntry {
    uint date;
    string descr;
  }

  string[] public shipNames;
  mapping(string=>string[]) partNames;
  mapping(string=>mapping(string=>ActionEntry[])) public allRecords;

  function addShip(string memory name) public {
    shipNames.push(name);
  }

  function getShipName(uint idx) public view returns (string memory) {
    return shipNames[idx];
  }

  function addPart(string memory shipName, string memory partName) public {
    partNames[shipName].push(partName);
  }

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

  // 
  // ActionEntry[] entries;

  // function addEntry(string memory ship, string memory part, string memory descr, uint date) public returns(string memory){
      
  //   ActionEntry memory newEntry = ActionEntry(date, descr);
  //   shipsData[ship][part].push(newEntry);

  //   return shipsData[ship][part][0].descr;
  // }

  // function getEntry(string memory ship, string memory part) public view returns(string memory){
  //   uint lastIdx = shipsData[ship][part].length;
  //   return shipsData[ship][part][lastIdx].descr;
  // }

}
