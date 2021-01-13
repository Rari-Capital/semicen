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
  RariDelegatorContract,
} from "../typechain";
import { nullAddress } from "../utils";

const Semicen: SemicenContract = artifacts.require("Semicen");

const MockFundController: MockFundControllerContract = artifacts.require(
  "MockFundController"
);

const RariDelegator: RariDelegatorContract = artifacts.require("RariDelegator");

const MockFundManager: MockFundManagerContract = artifacts.require(
  "MockFundManager"
);

const minEpochLength = 21600;
const claimRewardsTimelock = 604800;

contract("Semicen", (accounts) => {
  let [deployer, rebalancer1, rebalancer2, rebalancer3, random] = accounts;

  let semicen: SemicenInstance;

  before(async () => {
    const mockFundManager = await MockFundManager.new();
    const mockFundController = await MockFundController.new();

    const rariDelegator = await RariDelegator.new(
      mockFundController.address,
      mockFundManager.address,
      nullAddress
    );

    semicen = await Semicen.new(
      minEpochLength,
      claimRewardsTimelock,
      rariDelegator.address
    );

    await rariDelegator.setSemicen(semicen.address);
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
          {
            actionCode: 1,
            liquidityPool: 0,
            inputCurrencyCode: "DAI",
            outputCurrencyCode: "",
            amount: 0,
          },
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
        {
          actionCode: 0,
          liquidityPool: 0,
          inputCurrencyCode: "USDC",
          outputCurrencyCode: "",
          amount: 1000,
        },
        {
          actionCode: 1,
          liquidityPool: 1,
          inputCurrencyCode: "USDC",
          outputCurrencyCode: "",
          amount: 1000,
        },
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
          {
            actionCode: 2,
            liquidityPool: 1,
            inputCurrencyCode: "USDC",
            outputCurrencyCode: "",
            amount: 1000,
          },
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
        {
          actionCode: 2,
          liquidityPool: 1,
          inputCurrencyCode: "USDC",
          outputCurrencyCode: "",
          amount: 1000,
        },
        {
          actionCode: 3,
          liquidityPool: 0,
          inputCurrencyCode: "USDT",
          outputCurrencyCode: "",
          amount: 1000,
        },
        {
          actionCode: 4,
          liquidityPool: 0,
          inputCurrencyCode: "USDT",
          outputCurrencyCode: "USDC",
          amount: 1000,
        },
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
        {
          actionCode: 2,
          liquidityPool: 1,
          inputCurrencyCode: "USDT",
          outputCurrencyCode: "",
          amount: 500,
        },
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

  it("allows setting the fund delegator", async () => {
    const rariDelegator2 = await RariDelegator.new(
      nullAddress,
      nullAddress,
      semicen.address
    );

    await semicen.setFundDelegator(rariDelegator2.address);
  });
});
