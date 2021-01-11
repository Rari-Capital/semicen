// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "../interfaces/FundManager.sol";
import "hardhat/console.sol";

contract MockFundManager is FundManager {
    uint256 lastWithdraw = block.timestamp;

    function getInterestFeesUnclaimed()
        external
        view
        override
        returns (uint256)
    {
        return block.timestamp - lastWithdraw;
    }

    function withdrawInterestFees(uint256 amount, address to)
        external
        override
    {
        lastWithdraw = block.timestamp;

        console.log("Reward", amount, "USD to:", to);
    }
}
