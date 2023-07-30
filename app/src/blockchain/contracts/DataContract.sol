pragma solidity ^0.8.2;
pragma abicoder v2;

contract DataContract {

  event Log(string text);
  event Debug(string element, string value);

  struct Record {
    uint date;
    string descr;
  }

  string[] public shipNames;
  mapping(string=>string[]) partNames;
  mapping(string=>mapping(string=>Record[])) public allRecords;

  // SHIP functions

  function addShip(string memory name) public {
    require(!contains(shipNames, name), "Error: Ship with provided name already exists.");
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
    require(!contains(partNames[shipName], partName), "Error: Part with provided name already exists for this ship.");
    partNames[shipName].push(partName);
  }

  function getAllShipParts(string memory shipName) public view returns (string[] memory){
    return partNames[shipName];
  }

  // RECORD functions

  function addRecord(string memory shipName, string memory partName, uint date, string memory descr) public {
    //TODO: change date
    require(contains(partNames[shipName], partName), "Error: Part for given ship does not exist.");
    Record memory newEntry = Record(date, descr);
    allRecords[shipName][partName].push(newEntry);
    emit Log("New record added");
  }

  function getLatestRecords(string memory ship) public view returns (string[] memory, Record[] memory){
    Record[] memory latestRecords = new Record[](partNames[ship].length);
    // For each part in the ship get the latest record (the last in the array)
    for (uint256 i = 0 ; i < partNames[ship].length ; i++) {
      uint256 lastIdx = allRecords[ship][partNames[ship][i]].length - 1;
      latestRecords[i] = allRecords[ship][partNames[ship][i]][lastIdx];
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
