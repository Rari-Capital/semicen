// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "hardhat/console.sol";

contract MockFundController {
    function approveToPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external {
        // prettier-ignore
        console.log("Approve: amount-symbol-pool", amount, currencyCode, pool);
    }

    function depositToPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external {
        // prettier-ignore
        console.log("Deposit: amount-symbol-pool", amount, currencyCode, pool);
    }

    function withdrawFromPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external {
        // prettier-ignore
        console.log("Withdraw: amount-symbol-pool", amount, currencyCode, pool);
    }

    function approveToMUsd(string calldata currencyCode, uint256 amount)
        external
    {
        // prettier-ignore
        console.log("Approve to mStable: symbol-amount", currencyCode, amount);
    }

    function swapMStable(
        string calldata inputCurrencyCode,
        string calldata outputCurrencyCode,
        uint256 inputAmount
    ) external {
        // prettier-ignore
        console.log("Swap on mStable: inputSymbol-outputSymbol-amount", inputCurrencyCode, outputCurrencyCode, inputAmount);
    }
}
