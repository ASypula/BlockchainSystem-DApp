pragma solidity ^0.8.2;
pragma abicoder v2;

contract DataContract {

  event Log(string text);
  event Debug(string element, string value);
  event LogNr (uint nr);

  struct Record {
    uint date;
    string descr;
  }

  string[] public shipNames;
  mapping(string=>string[]) partNames;
  mapping(string=>mapping(string=>Record[])) public allRecords;

  // SHIP functions

  function addShip(string memory name) public {
    emit Log("In addShip");
    require(!contains(shipNames, name), "Error: Ship with provided name already exists.");
    emit Debug("Ship added", name);
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
    emit Log("In addPart");
    require(!contains(partNames[shipName], partName), "Error: Part with provided name already exists for this ship.");
    emit Debug("Part added", partName);
    partNames[shipName].push(partName);
  }

  function getAllShipParts(string memory shipName) public view returns (string[] memory){
    return partNames[shipName];
  }

  // RECORD functions

  function addRecord(string memory shipName, string memory partName, uint date, string memory descr) public {
    emit Log("In Add Record");
    require(contains(partNames[shipName], partName), "Error: Part for given ship does not exist.");
    Record memory newEntry = Record(date, descr);
    allRecords[shipName][partName].push(newEntry);
    emit Log("New record added");
  }

// add view to function declaration
  function getLatestRecords(string memory ship) public returns (string[] memory, Record[] memory){
    emit Log("In getLatestRecords");
    Record[] memory latestRecords = new Record[](partNames[ship].length);
    emit LogNr(partNames[ship].length);
    // For each part in the ship get the latest record (the last in the array)
    for (uint256 i = 0 ; i < partNames[ship].length ; i++) {
      uint256 lastIdx = allRecords[ship][partNames[ship][i]].length - 1;
      latestRecords[i] = allRecords[ship][partNames[ship][i]][lastIdx];
      emit Debug(ship, allRecords[ship][partNames[ship][i]][lastIdx].descr);
    }
    return (partNames[ship], latestRecords);
  }

  function getRecord(string memory shipName, string memory partName) public view returns (string memory){
    return allRecords[shipName][partName][0].descr;
  }

  function areSimilarStrings(string memory a, string memory b) private pure  returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

  function contains(string[] memory arrayToCheck, string memory value) private pure returns (bool){
    for (uint256 i=0; i<arrayToCheck.length; i++){
      if (areSimilarStrings(arrayToCheck[i], value)){
        return true;
      }
    }
    return false;
  }

}
