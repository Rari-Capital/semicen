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
contract("Semicen", (accounts) => {
  let [deployer, rebalancer1, rebalancer2, rebalancer3] = accounts;

  let semicen: SemicenInstance;

  before(async () => {
    const mockFundController = await MockFundController.new();
    const mockFundManager = await MockFundManager.new();

    semicen = await Semicen.new(
      30,
      20,
      mockFundController.address,
      mockFundManager.address
    );
  });

  it("should work", async function () {
    console.log(await semicen.hasEpochExpired());
  });
});
