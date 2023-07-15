pragma solidity ^0.5.0;


contract FirstContract {
  struct PartEntry {
      uint date;
      string descr;
  }
  event Log(string description);

  string public namee;

  mapping(string=>mapping(string=>PartEntry[])) public shipsData;
  PartEntry[] entries;

  function fun2(string memory entry) public returns(string memory){
      string memory fake1 = "one";
      string memory fake2 = "two";
      
      PartEntry memory newEntry = PartEntry(1, entry);
      shipsData[fake1][fake2].push(newEntry);

      emit Log(shipsData[fake1][fake2][0].descr);

      namee = shipsData[fake1][fake2][0].descr;

      return shipsData[fake1][fake2][0].descr;
  }

}
