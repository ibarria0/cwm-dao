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
      overrides: {
        "contracts/usdc.sol": {
            version: "0.6.12",
            settings: { }
        },
        "contracts/usdc_admin.sol": {
            version: "0.6.12",
            settings: { }
        }
      }
  },
  networks: {
      hardhat: {
          forking: {
            url: POLYGON_MAIN_URL,
          },
      },
      mumbai: {
         url: MUMBAI_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
};
