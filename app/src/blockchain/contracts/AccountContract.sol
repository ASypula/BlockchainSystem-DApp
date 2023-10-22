// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
pragma abicoder v2;

/*
 * Contract for storing addresses of accounts that are authorized
 * to use the application ShipParts
 * Core state variable - accounts
 */
contract AccountContract {

    event Log(string text);

   string[] public accounts = ["0x95859dDDcA6947DC0788275Df55b99140F5f72D2"];

   function getAllAccounts() public returns (string[] memory){
    emit Log("Preparing to load all permitted accounts");
    return accounts;
   }

}
