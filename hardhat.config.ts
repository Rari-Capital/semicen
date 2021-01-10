import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";

const { gweiToWei } = require("./utils");

// Plugins:
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-truffle5";
import "hardhat-typechain";
import { removeConsoleLog } from "hardhat-preprocessor";

const config: HardhatUserConfig = {
  networks: {
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

  preprocess: {
    eachLine: removeConsoleLog(
      (bre) =>
        bre.network.name !== "hardhat" && bre.network.name !== "localhost"
    ),
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  typechain: {
    target: "truffle-v5",
  },
};

export default config;
