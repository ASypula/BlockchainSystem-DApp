var FirstContract = artifacts.require("./contracts/FirstContract.sol");

module.exports = function(deployer) {
  deployer.deploy(FirstContract);
};
