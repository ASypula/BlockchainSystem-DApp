pragma solidity ^0.8.2;
pragma abicoder v2;

/*
 * Contract for storing data about maintenance records
 * Immutability is granted by using the state variables as a database
 * Core state variable:
      * shipName
      * partNames
      * allRecords
 */
contract DataContract {

  // Each record has a date, description and file stored on the blockchain
  // File is being represented as a string and upon downloading by a user converted to a plain file
  struct Record {
    uint date;
    string descr;
    string file;
  }
  
  event Log(string text);
  event LogData(string text, string value);

  string[] public shipNames;
  mapping(string=>string[]) partNames;
  mapping(string=>mapping(string=>Record[])) public allRecords;

  // SHIP functions

  function addShip(string memory name) public {
    emit LogData("Preparing to add a new ship", name);
    require(!contains(shipNames, name), "Error: Ship with provided name already exists.");
    shipNames.push(name);
    emit LogData("Ship added successfully", name);
  }

  function getShipName(uint idx) public returns (string memory) {
    emit Log("Preparing to get a ship");
    return shipNames[idx];
  }

  function getAllShips() public returns (string[] memory){
    emit Log("Preparing to get all ships");
    return shipNames;
  }

  // PART functions

  function addPart(string memory shipName, string memory partName) public {
    emit LogData("Preparing to add a new part", partName);
    require(!contains(partNames[shipName], partName), "Error: Part with provided name already exists for this ship.");
    partNames[shipName].push(partName);
    emit LogData("Part added successfully to ship", partName);
  }

  function getAllShipParts(string memory shipName) public returns (string[] memory){
    emit LogData ("Preparing to load all ship's parts", shipName);
    return partNames[shipName];
  }

  // RECORD functions

  function addRecord(string memory shipName, string memory partName, uint date, string memory descr, string memory file) public {
    emit LogData("Preparing to add a new record to", partName);
    require(contains(partNames[shipName], partName), "Error: Part for given ship does not exist.");
    Record memory newEntry = Record(date, descr, file);
    allRecords[shipName][partName].push(newEntry);
    emit Log("New record added successfully");
  }

  function getLatestRecords(string memory ship) public returns (string[] memory, Record[] memory){
    emit Log("Preparing to load latest records for ship");
    Record[] memory latestRecords = new Record[](partNames[ship].length);
    // For each part in the ship get the latest record (the last in the array)
    for (uint256 i = 0 ; i < partNames[ship].length ; i++) {
      uint256 lastIdx = allRecords[ship][partNames[ship][i]].length - 1;
      latestRecords[i] = allRecords[ship][partNames[ship][i]][lastIdx];
    }
    emit Log("Latest records loaded successfully");
    return (partNames[ship], latestRecords);
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
