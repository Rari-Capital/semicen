import { task, types } from "hardhat/config";

import { nullAddress } from "./utils";

import { SemicenContract } from "./typechain/Semicen";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { RariDelegatorContract } from "./typechain";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function importantLog(msg: any) {
  console.log();
  console.log();
  console.log(msg);
  console.log();
  console.log();
}

function retryOperation(operation: () => any, delay: number, retries: number) {
  return new Promise((resolve, reject) => {
    return operation()
      .then(resolve)
      .catch((reason) => {
        if (retries > 0) {
          importantLog(
            `Failed to run task. Trying again after ${
              delay / 1000
            } seconds. Trying a max ${retries - 1} of more times.`
          );

          return sleep(delay)
            .then(retryOperation.bind(null, operation, delay, retries - 1))
            .then(resolve)
            .catch(reject);
        }
        return reject(reason);
      });
  });
}

async function deploySemicen(
  {
    epochLength,
    rewardClaimTimelock,
    delegator,
  }: {
    epochLength: string;
    rewardClaimTimelock: string;
    delegator: string;
  },
  hre: HardhatRuntimeEnvironment
) {
  const Semicen: SemicenContract = hre.artifacts.require("Semicen");

  const constructorArgs: [string, string, string] = [
    epochLength.toString(),
    rewardClaimTimelock.toString(),
    delegator,
  ];

  importantLog("Deploying a Semicen with " + constructorArgs.join(", "));

  const semicen = await Semicen.new(...constructorArgs);

  importantLog("Deployed! Trying to verify in 5 seconds!");

  // Sleep for 10 seconds while Etherscan propogates.
  await sleep(10000);

  // Verify on Etherscan and retry a max of 3 times with a 10 second delay in-between each try.
  await retryOperation(
    () =>
      hre.run("verify", {
        network: hre.network.name,
        address: semicen.address,
        constructorArguments: constructorArgs,
      }),
    10000,
    3
  );

  importantLog(
    `Deployed a Semicen instance at ${semicen.address} on ${hre.network.name}!`
  );

  return semicen;
}

async function deployDelegator(
  {
    fundController,
    fundManager,
    semicen,
  }: {
    fundController: string;
    fundManager: string;
    semicen: string;
  },
  hre: HardhatRuntimeEnvironment
) {
  const RariDelegator: RariDelegatorContract = hre.artifacts.require(
    "RariDelegator"
  );

  const constructorArgs: [string, string, string] = [
    fundController.toString(),
    fundManager.toString(),
    semicen,
  ];

  importantLog("Deploying a Delegator with " + constructorArgs.join(", "));

  const delegator = await RariDelegator.new(...constructorArgs);

  importantLog("Deployed! Trying to verify in 5 seconds!");

  // Sleep for 10 seconds while Etherscan propogates.
  await sleep(10000);

  // Verify on Etherscan and retry a max of 3 times with a 10 second delay in-between each try.
  await retryOperation(
    () =>
      hre.run("verify", {
        network: hre.network.name,
        address: delegator.address,
        constructorArguments: constructorArgs,
      }),
    10000,
    3
  );

  importantLog(
    `Deployed a Delegator instance at ${delegator.address} on ${hre.network.name}!`
  );

  return delegator;
}

task("deploy-semicen", "Deploys a Semicen contract.")
  .addParam(
    "epochLength",
    "The minimum delay in seconds between rebalances.",
    undefined,
    types.int
  )
  .addParam(
    "rewardClaimTimelock",
    "The amount of seconds that must have passed since the user's last rebalance before they can claim their rewards.",
    undefined,
    types.int
  )
  .addOptionalParam(
    "delegator",
    "The address of the delegator contract to use to perform rebalances.",
    nullAddress
  )
  .setAction(async function (
    { epochLength, rewardClaimTimelock, delegator },
    hre
  ) {
    await deploySemicen(
      {
        epochLength: epochLength.toString(),
        rewardClaimTimelock: rewardClaimTimelock.toString(),
        delegator,
      },
      hre
    );
  });

task("deploy-delegator", "Deploys a RariDelegator contract.")
  .addParam(
    "fundController",
    "The address of the FundController the delegator will interact with."
  )
  .addParam(
    "fundManager",
    "The address of the FundManager the delegator will interact with."
  )
  .addOptionalParam(
    "semicen",
    "The address of the semicen contract this delegator will perform rebalances for.",
    nullAddress
  )
  .setAction(async function ({ fundController, fundManager, semicen }, hre) {
    await deployDelegator(
      {
        fundController: fundController.toString(),
        fundManager: fundManager.toString(),
        semicen,
      },
      hre
    );
  });

task(
  "deploy-semicen-and-delegator",
  "Deploys a Semicen contract and a RariDelegator and links them."
)
  .addParam(
    "fundController",
    "The address of the FundController the delegator will interact with."
  )
  .addParam(
    "fundManager",
    "The address of the FundManager the delegator will interact with."
  )
  .addParam(
    "epochLength",
    "The minimum delay in seconds between rebalances.",
    undefined,
    types.int
  )
  .addParam(
    "rewardClaimTimelock",
    "The amount of seconds that must have passed since the user's last rebalance before they can claim their rewards.",
    undefined,
    types.int
  )

  .setAction(async function (
    { epochLength, rewardClaimTimelock, fundController, fundManager },
    hre
  ) {
    const semicen = await deploySemicen(
      {
        epochLength: epochLength.toString(),
        rewardClaimTimelock: rewardClaimTimelock.toString(),
        delegator: nullAddress,
      },
      hre
    );

    const delegator = await deployDelegator(
      {
        fundController: fundController.toString(),
        fundManager: fundManager.toString(),
        semicen: semicen.address,
      },
      hre
    );

    importantLog("Linking the deployed Semicen to the RariDelegator!");
    await semicen.setFundDelegator(delegator.address);

    importantLog(
      `All deployed and linked on ${hre.network.name}! Semicen: ${semicen.address} | RariDelegator: ${delegator.address}`
    );
  });
