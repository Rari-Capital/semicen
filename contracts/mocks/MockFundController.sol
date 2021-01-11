// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "../delegators/FundDelegator.sol";
import "hardhat/console.sol";

contract MockFundController is FundController {
    function depositToPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external override {
        console.log("Deposit: amount-symbol-pool", amount, currencyCode, pool);
    }

    function withdrawFromPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external override {
        console.log("Withdraw: amount-symbol-pool", amount, currencyCode, pool);
    }
}
