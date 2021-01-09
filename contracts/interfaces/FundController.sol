// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

interface FundController {
    function depositToPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external;

    function withdrawFromPool(
        uint256 pool,
        string calldata currencyCode,
        uint256 amount
    ) external;
}
