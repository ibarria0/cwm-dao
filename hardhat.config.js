/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
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
};
