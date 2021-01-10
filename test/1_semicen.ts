import { artifacts, contract } from "hardhat";
import { SemicenContract, SemicenInstance } from "../typechain/Semicen";
const Semicen: SemicenContract = artifacts.require("Semicen");

contract("Semicen", (accounts) => {
  let [deployer, rebalancer1, rebalancer2, rebalancer3] = accounts;

  let semicen: SemicenInstance;

  before(async () => {
    semicen = await Semicen.new(
      30,
      20,
      "0xEe7162bB5191E8EC803F7635dE9A920159F1F40C",
      "0xC6BF8C8A55f77686720E0a88e2Fd1fEEF58ddf4a"
    );
  });

  it("should work", async function () {
    console.log(await semicen.hasEpochExpired());
  });
});
