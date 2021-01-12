// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "../delegators/FundDelegator.sol";
import "hardhat/console.sol";

contract MockFundManager is IFundManager {
    uint256 lastWithdraw = block.timestamp * 1e18;

    function getRebalancerPercentage() public override returns (uint256) {
        // 10%
        return (1 ether) / 10;
    }

    function getInterestFeesUnclaimed() external override returns (uint256) {
        return (block.timestamp * 1e18) - lastWithdraw;
    }

    function withdrawInterestFees(uint256 amount, address to)
        external
        override
    {
        lastWithdraw = block.timestamp * 1e18;

        console.log("Reward", amount, "USD to:", to);
    }
}
