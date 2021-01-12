import { artifacts, contract } from "hardhat";
import {
  MockFundManagerContract,
  MockFundControllerContract,
  RariDelegatorContract,
  RariDelegatorInstance,
} from "../typechain";
import { nullAddress } from "../utils";

const MockFundController: MockFundControllerContract = artifacts.require(
  "MockFundController"
);

const RariDelegator: RariDelegatorContract = artifacts.require("RariDelegator");

const MockFundManager: MockFundManagerContract = artifacts.require(
  "MockFundManager"
);

contract("Semicen", (accounts) => {
  let [deployer, random] = accounts;

  let delegator: RariDelegatorInstance;

  before(async () => {
    const mockFundManager = await MockFundManager.new();
    const mockFundController = await MockFundController.new();

    delegator = await RariDelegator.new(
      mockFundController.address,
      mockFundManager.address,
      deployer
    );
  });

  it("allows setting the fund manager and fund controller", async function () {
    const mockFundManager2 = await MockFundManager.new();
    const mockFundController2 = await MockFundController.new();

    await delegator.setFundController(mockFundController2.address);
    await delegator.setFundManager(mockFundManager2.address);
  });

  it("only lets the semicen performSteps", async function () {
    await delegator
      .performSteps([], { from: random })
      .should.be.rejectedWith("Only the Semicen can call this method");

    await delegator.performSteps([]);
  });

  it("only lets the owner destroy the contract", async function () {
    await delegator.owner().should.become(deployer);

    await delegator
      .destroy({ from: random })
      .should.be.rejectedWith("caller is not the owner");

    await delegator.destroy();

    await delegator
      .owner()
      .should.be.rejectedWith("Returned values aren't valid");
  });
});
