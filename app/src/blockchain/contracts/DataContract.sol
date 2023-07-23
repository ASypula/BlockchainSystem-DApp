pragma solidity ^0.5.0;

contract DataContract {

  struct ActionEntry {
    uint date;
    string descr;
  }

  // list of ship names and part names?

  string public namee;

  mapping(string=>mapping(string=>ActionEntry[])) public shipsData;
  ActionEntry[] entries;

  function addEntry(string memory ship, string memory part, string memory descr, uint date) public returns(string memory){
      
    ActionEntry memory newEntry = ActionEntry(date, descr);
    shipsData[ship][part].push(newEntry);

    namee = shipsData[ship][part][0].descr;

    return shipsData[ship][part][0].descr;
  }

  function getEntry(string memory ship, string memory part) public view returns(string memory){
    uint lastIdx = shipsData[ship][part].length;
    return shipsData[ship][part][lastIdx].descr;
  }

  function foo(string memory name) public returns(string memory){
    return name;
  }

}
