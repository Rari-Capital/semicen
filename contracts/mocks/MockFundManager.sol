// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "../interfaces/FundManager.sol";

contract MockFundManager is FundManager {
    function getInterestFeesUnclaimed() external override returns (uint256) {
        return 200;
    }

    function withdrawInterestFees(uint256 amount, address to)
        external
        override
    {}
}
