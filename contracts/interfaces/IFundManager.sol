// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

interface IFundManager {
    function getRebalancerPercentage() external returns (uint256);

    function getInterestFeesUnclaimed() external returns (uint256);

    function withdrawInterestFees(uint256 amount, address to) external;
}
