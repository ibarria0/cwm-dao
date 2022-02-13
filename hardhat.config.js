/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan");
require("./tasks/faucet");
require("./tasks/USDC_faucet");

const { POLYGON_MAIN_URL, MUMBAI_URL, PRIVATE_KEY, POLYSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
      compilers: [{version: '0.8.7'}],
  },
  etherscan: {
      apiKey: {
          polygon: POLYSCAN_API_KEY,
          polygonMumbai: POLYSCAN_API_KEY 
      }
  },
  networks: {
      hardhat: {
          forking:{
              url: POLYGON_MAIN_URL
          }
      },
      polygon: {
         url: POLYGON_MAIN_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      mumbai: {
         url: MUMBAI_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
  },
  typechain: {
    outDir: 'frontend/typechain',
  }
};
