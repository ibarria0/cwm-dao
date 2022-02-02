/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require('@typechain/hardhat');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("./tasks/faucet");
require("./tasks/USDC_faucet");

const { POLYGON_MAIN_URL, MUMBAI_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
      compilers: [{version: '0.8.2'}],
  },
  paths: {
    artifacts: './frontend/src/artifacts'
  },
  networks: {
      hardhat: {
          forking: {
            url: POLYGON_MAIN_URL,
            blockNumber: 24365626 
          },
      },
      mumbai: {
         url: MUMBAI_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
   typechain: {
    outDir: 'types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};
