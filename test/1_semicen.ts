import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiBnEqual from "chai-bn-equal";
chai.use(chaiBnEqual);
chai.use(chaiAsPromised);
chai.should();

import timeMachine from "ganache-time-traveler";

import { artifacts, contract, web3 } from "hardhat";
import {
  MockFundManagerContract,
  MockFundControllerContract,
  SemicenContract,
  SemicenInstance,
  MockFundControllerInstance,
  MockFundManagerInstance,
} from "../typechain";

const Semicen: SemicenContract = artifacts.require("Semicen");

const MockFundController: MockFundControllerContract = artifacts.require(
  "MockFundController"
);

const MockFundManager: MockFundManagerContract = artifacts.require(
  "MockFundManager"
);

const minEpochLength = 21600;
const claimRewardsTimelock = 604800;

function findJSONInterface(jsonInterfaces: any, name: string) {
  for (const jsonInterface of jsonInterfaces) {
    if (jsonInterface.name == name) {
      return jsonInterface;
    }
  }
}

function encodeFunctionCall(
  fundControllerJSONInterface: any,
  functionName: string,
  params: any[]
) {
  return web3.eth.abi.encodeFunctionCall(
    findJSONInterface(fundControllerJSONInterface, functionName),
    params
  );
}

contract("Semicen", (accounts) => {
  let [deployer, rebalancer1, rebalancer2, rebalancer3, random] = accounts;

  let semicen: SemicenInstance;
  let mockFundController: MockFundControllerInstance;
  let mockFundManager: MockFundManagerInstance;

  let fundControllerJSONInterface;

  before(async () => {
    mockFundController = await MockFundController.new();
    mockFundManager = await MockFundManager.new();

    fundControllerJSONInterface =
      mockFundController.contract.options.jsonInterface;

    semicen = await Semicen.new(
      minEpochLength,
      claimRewardsTimelock,
      mockFundController.address,
      mockFundManager.address
    );
  });

  it("adds the deployer as a rebalancer by default", async function () {
    await semicen.trustedRebalancers(deployer).should.become(true);
  });

  it("should allow adding rebalancers", async function () {
    await semicen.addRebalancer(rebalancer1);
    await semicen.addRebalancer(rebalancer2);
    await semicen.addRebalancer(rebalancer3);

    await semicen.trustedRebalancers(rebalancer1).should.become(true);
    await semicen.trustedRebalancers(rebalancer2).should.become(true);
    await semicen.trustedRebalancers(rebalancer3).should.become(true);

    await semicen.trustedRebalancers(random).should.become(false);
  });

  it("should allow removing rebalancers", async function () {
    await semicen.addRebalancer(random);
    await semicen.trustedRebalancers(random).should.become(true);
    await semicen.removeRebalancer(random);
    await semicen.trustedRebalancers(random).should.become(false);
  });

  it("does not allow non trusted rebalancers to rebalance", async () => {
    await semicen
      .rebalance(
        [
          encodeFunctionCall(fundControllerJSONInterface, "withdrawFromPool", [
            "1",
            "USDT",
            (400 * 1e6).toString(),
          ]),
        ],
        {
          from: random,
        }
      )
      .should.be.rejectedWith("must be a trusted rebalancer");
  });

  it("should allow rebalancing", async function () {
    await semicen.hasEpochExpired().should.become(true);

    const tx = await semicen.rebalance(
      [
        encodeFunctionCall(fundControllerJSONInterface, "approveToPool", [
          "1",
          "DAI",
          (400 * 1e18).toString(),
        ]),

        encodeFunctionCall(fundControllerJSONInterface, "depositToPool", [
          "1",
          "DAI",
          (400 * 1e18).toString(),
        ]),
      ],
      { from: rebalancer1 }
    );

    const timestamp = (await web3.eth.getBlock(tx.receipt.blockNumber))
      .timestamp;

    await semicen.hasEpochExpired().should.become(false);

    await semicen
      .rebalancerLastRebalance(rebalancer1)
      .should.eventually.bnEqual(timestamp);
  });

  it("shoud not allow rebalances before the min epoch length is over", async function () {
    await semicen
      .rebalance(
        [
          encodeFunctionCall(fundControllerJSONInterface, "withdrawFromPool", [
            "1",
            "DAI",
            (400 * 1e18).toString(),
          ]),
        ],
        {
          from: rebalancer2,
        }
      )
      .should.eventually.be.rejectedWith(
        "wait out the full min epoch duration"
      );
  });

  it("it should allow a second rebalance after the min epoch length is over", async () => {
    semicen
      .rebalancerUnclaimedRewards(rebalancer1)
      .should.eventually.bnEqual(0);

    await timeMachine.advanceTimeAndBlock(minEpochLength);

    await semicen.rebalance(
      [
        encodeFunctionCall(fundControllerJSONInterface, "withdrawFromPool", [
          "1",
          "USDT",
          (400 * 1e6).toString(),
        ]),

        encodeFunctionCall(fundControllerJSONInterface, "approveToMUsd", [
          "USDT",
          (400 * 1e6).toString(),
        ]),

        encodeFunctionCall(fundControllerJSONInterface, "swapMStable", [
          "USDT",
          "USDC",
          (400 * 1e6).toString(),
        ]),

        encodeFunctionCall(fundControllerJSONInterface, "depositToPool", [
          "1",
          "USDC",
          (400 * 1e6).toString(),
        ]),
      ],
      { from: rebalancer2 }
    );

    parseInt(
      (await semicen.rebalancerUnclaimedRewards(rebalancer1)).toString()
    ).should.be.greaterThan(0);
  });

  it("does not allow the owner to seize more rewards than allocated", async () => {
    await semicen
      .seizeRewards(
        rebalancer1,
        (await semicen.rebalancerUnclaimedRewards(rebalancer1))
          .add(web3.utils.toBN(999999999))
          .toString()
      )
      .should.be.rejectedWith("does not have enough rewards");
  });

  it("it allows the owner to seize rewards", async () => {
    semicen.rebalancerUnclaimedRewards(deployer).should.eventually.bnEqual(0);

    await semicen.seizeRewards(
      rebalancer1,
      (await semicen.rebalancerUnclaimedRewards(rebalancer1)).toString()
    );

    semicen
      .rebalancerUnclaimedRewards(rebalancer1)
      .should.eventually.bnEqual(0);

    parseInt(
      (await semicen.rebalancerUnclaimedRewards(deployer)).toString()
    ).should.be.greaterThan(0);
  });

  it("allows claiming rewards after timelock", async () => {
    await timeMachine.advanceTimeAndBlock(minEpochLength);

    await semicen.rebalance(
      [
        encodeFunctionCall(fundControllerJSONInterface, "depositToPool", [
          "1",
          "USDC",
          (10 * 1e6).toString(),
        ]),
      ],
      { from: rebalancer2 }
    );

    await semicen
      .claimRewards({ from: rebalancer1 })
      .should.eventually.be.rejectedWith("wait out the reward claim timelock");

    await timeMachine.advanceTimeAndBlock(claimRewardsTimelock);

    await semicen.claimRewards({ from: rebalancer2 });

    semicen
      .rebalancerUnclaimedRewards(rebalancer2)
      .should.eventually.bnEqual(0);
  });

  it("it will revert on a bad step", async () => {
    await timeMachine.advanceTimeAndBlock(minEpochLength * 1.5);

    await semicen
      .rebalance([web3.eth.abi.encodeFunctionSignature("notAFunction()")], {
        from: rebalancer2,
      })
      .should.be.rejectedWith("Execution of a step failed");
  });

  it("allows setting the epoch length and reward timelock", async () => {
    const newEpochLength = 1337;

    await semicen.setMinEpochLength(newEpochLength);
    await semicen.minEpochLength().should.eventually.bnEqual(newEpochLength);

    const newClaimTimelock = 13370;

    await semicen.setRewardClaimTimelock(newClaimTimelock);
    await semicen
      .rewardClaimTimelock()
      .should.eventually.bnEqual(newClaimTimelock);
  });

  it("allows setting the fundManager and fundController", async () => {
    const mockFundController2 = await MockFundController.new();

    await semicen.setFundController(mockFundController2.address);
    await semicen
      .fundController()
      .should.eventually.become(mockFundController2.address);

    const mockFundManager2 = await MockFundManager.new();

    await semicen.setFundManager(mockFundManager2.address);
    await semicen
      .fundManager()
      .should.eventually.become(mockFundManager2.address);
  });
});
