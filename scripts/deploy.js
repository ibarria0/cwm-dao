async function main() {
  let minterRole = ethers.utils.id("MINTER_ROLE");
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("CwmTokenV2");
  const token = await Token.deploy();

  console.log("Token address:", token.address);

  const Broker = await ethers.getContractFactory("CwmBroker");
  const broker = await Broker.deploy("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", token.address, "0x5121911a192245e1d2cb78a4d527b52ef41eeb77", "0x3ba0648fc91550fdb274bad53aa1fd7924b79ff9");

  console.log("Broker address:", broker.address);

  token.grantRole(minterRole, broker.address);
  if (token.hasRole(minterRole, broker.address)) {
      console.log("Grant roles to broker");
      console.log("Minter address:", broker.address);
  }

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
