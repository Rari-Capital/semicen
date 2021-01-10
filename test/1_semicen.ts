import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiBnEqual from "chai-bn-equal";
chai.use(chaiBnEqual);
chai.use(chaiAsPromised);
chai.should();

import timeMachine from "ganache-time-traveler";

import { artifacts, contract } from "hardhat";
import {
  MockFundControllerContract,
  MockFundManagerContract,
  SemicenContract,
  SemicenInstance,
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

contract("Semicen", (accounts) => {
  let [deployer, rebalancer1, rebalancer2, rebalancer3, random] = accounts;

  let semicen: SemicenInstance;

  before(async () => {
    const mockFundController = await MockFundController.new();
    const mockFundManager = await MockFundManager.new();

    semicen = await Semicen.new(
      minEpochLength,
      claimRewardsTimelock,
      mockFundController.address,
      mockFundManager.address
    );
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
});
