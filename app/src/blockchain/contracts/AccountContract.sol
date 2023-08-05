pragma solidity ^0.8.2;
pragma abicoder v2;

/*
 * Contract for storing addresses of accounts that are authorized
 * to use the application ShipParts
 * Core state variable - accounts
 */
contract AccountContract {

    event Log(string text);

   string[] public accounts = ["0x74727Ba4a34cC22203196bEda335f276fb1C52bC"];

   function getAllAccounts() public returns (string[] memory){
    emit Log("Preparing to load all permitted accounts");
    return accounts;
   }

}
