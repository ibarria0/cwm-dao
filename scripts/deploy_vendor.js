async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Vendor = await ethers.getContractFactory("CwmTokenVendor");
  const vendor = await Vendor.deploy("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", "0x5121911a192245e1d2cb78a4d527b52ef41eeb77", "0x3ba0648fc91550fdb274bad53aa1fd7924b79ff9");

  console.log("Vendor address:", vendor.address);
  saveFrontendFiles(vendor);
}

function saveFrontendFiles(vendor) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Vendor: vendor.address }, undefined, 2)
  );

  const VendorArtifact = artifacts.readArtifactSync("CwmTokenVendor");

  fs.writeFileSync(
    contractsDir + "/CwmTokenVendor.json",
    JSON.stringify(VendorArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
