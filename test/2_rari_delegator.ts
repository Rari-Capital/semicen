import { artifacts, contract } from "hardhat";
import {
  MockFundManagerContract,
  MockFundControllerContract,
  RariDelegatorContract,
  RariDelegatorInstance,
} from "../typechain";

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
    await delegator.performSteps([]);

    await delegator
      .performSteps([], { from: random })
      .should.be.rejectedWith("Only the Semicen can call this method");
  });
});
