pragma solidity ^0.5.0;

contract DataContract {

  struct ActionEntry {
    uint date;
    string descr;
  }

  string[] public shipNames;

  function addShip(string memory name) public {
    shipNames.push(name);
  }

  function getShipName(uint idx) public view returns (string memory) {
    return shipNames[idx];
  }

  // mapping(string=>mapping(string=>ActionEntry[])) public shipsData;
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
