// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

import { SemicenContract } from "../typechain/Semicen";
const Semicen: SemicenContract = artifacts.require("Semicen");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function importantLog(msg: any) {
  console.log();
  console.log();
  console.log(msg);
  console.log();
  console.log();
}

async function main() {
  const constructorArgs: [string, string, string, string] = [
    process.env.MIN_EPOCH_LENGTH,
    process.env.REWARD_CLAIM_TIMELOCK,
    process.env.FUNDCONTROLLER_ADDRESS,
    process.env.FUNDMANAGER_ADDRESS,
  ];

  importantLog("Deploying with " + constructorArgs.join(" "));

  const semicen = await Semicen.new(...constructorArgs);

  const sleepTime = parseInt(process.env.VERIFY_DELAY ?? "15000");

  importantLog(
    `Sleeping for ${sleepTime / 1000} seconds before attempting to verify!`
  );
  await sleep(sleepTime);

  await hre.run("verify", {
    network: hre.network.name,
    address: semicen.address,
    constructorArguments: constructorArgs,
  });

  importantLog(
    `Deployed a Semicen instance at ${semicen.address} on ${hre.network.name}!`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
