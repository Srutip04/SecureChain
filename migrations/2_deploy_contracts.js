var Certificate = artifacts.require("Certificates");

module.exports = function(deployer,network) {
  if(network === 'ropsten'){
  deployer.deploy(Certificate);
  }
  else{
    deployer.deploy(Certificate);
  }
};
