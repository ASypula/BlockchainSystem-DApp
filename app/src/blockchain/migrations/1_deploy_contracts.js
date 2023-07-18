var DataContract = artifacts.require("./contracts/DataContract.sol");

module.exports = function(deployer) {
  deployer.deploy(DataContract);
};
