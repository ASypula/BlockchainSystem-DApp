pragma solidity ^0.8.2;
pragma abicoder v2;

contract DataContract {

  event Log(string text);

  struct Record {
    uint date;
    string descr;
  }

  string[] public shipNames;
  mapping(string=>string[]) partNames;
  mapping(string=>mapping(string=>Record[])) public allRecords;

  // SHIP functions

  function addShip(string memory name) public {
    require(!contains(shipNames, name), "Error: Given ship already in the database.");
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
    Record memory newEntry = Record(1, descr);
    // allRecords[shipName][partName]=new ActionEntry[];
    // partNames[shipName].push(partName);
    allRecords[shipName][partName].push(newEntry);
    emit Log("New record added");
  }

  function getLatestRecords(string memory ship) public view returns (string[] memory, Record[] memory){
    Record[] memory latestRecords = new Record[](partNames[ship].length);
    //TODO: change the latestRecords to getting the last element, not first -> [0]
    for (uint256 i = 0 ; i < partNames[ship].length ; i++) {
      latestRecords[i] = allRecords[ship][partNames[ship][i]][0];
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
