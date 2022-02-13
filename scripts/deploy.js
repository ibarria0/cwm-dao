async function main() {
  let ADMIN_ROLE = ethers.utils.id("DEFAULT_ADMIN_ROLE")
  let minterRole = ethers.utils.id("MINTER_ROLE");
  let snapshotRole = ethers.utils.id("SNAPSHOT_ROLE");
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("CwmTokenV2");
  const token = await Token.deploy();
  console.log("Token address:", token.address);
  await token.deployed();

  const txHash = token.deployTransaction.hash;
  console.log(`Tx hash: ${txHash}\nWaiting for transaction to be mined...`);
  const txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log("Contract address:", txReceipt.contractAddress);

  tx = await token.grantRole(ADMIN_ROLE, deployer.address);
  await tx.wait()

  if (await token.hasRole(ADMIN_ROLE, deployer.address)) {
      console.log("Grant roles to deployer");
      console.log("TOKEN ADMIN address:", deployer.address);
  }

  const Broker = await ethers.getContractFactory("CwmBroker");
  const broker = await Broker.deploy("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", token.address, "0x5121911a192245e1d2cb78a4d527b52ef41eeb77", "0x3C618bA6a957D53998a182A0b4a27D8F240DB1bf");
  await broker.deployed();
  console.log("Broker address:", broker.address);

  tx = await token.grantRole(minterRole, broker.address);
  await tx.wait()

  if (await token.hasRole(minterRole, broker.address)) {
      console.log("Grant roles to broker");
      console.log("Minter address:", broker.address);
  }

  tx = await token.grantRole(snapshotRole, broker.address);
  await tx.wait()
  if (await token.hasRole(snapshotRole, broker.address)) {
      console.log("Grant snapshot role");
      console.log("Snapshot address:", "0x304BD332669C040a69c0734E74d43371A69dD559");
  }

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
