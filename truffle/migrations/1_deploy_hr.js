const HEALTHRECORD = artifacts.require("HEALTHRECORD");

module.exports = function(deployer) {
  deployer.deploy(HEALTHRECORD);
};
