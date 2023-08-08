var AccountContract = artifacts.require("./contracts/AccountContract.sol");

module.exports = function (deployer) {
  deployer.deploy(AccountContract);
};
