/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// Plugins:
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

const { gweiToWei } = require("./utils");

module.exports = {
  kovan: {
    url: "https://kovan.infura.io/v3/" + process.env.INFURA_KEY,
    accounts: [process.env.PRIVATE_KEY],
  },

  ropsten: {
    url: "https://ropsten.infura.io/v3/" + process.env.INFURA_KEY,
    accounts: [process.env.PRIVATE_KEY],
  },

  mainnet: {
    url: "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY,
    accounts: [process.env.PRIVATE_KEY],
    gasPrice: gweiToWei(process.env.GWEI_GAS_PRICE),
  },

  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1440,
      },
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
