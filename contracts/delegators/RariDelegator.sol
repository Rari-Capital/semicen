// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;
pragma experimental ABIEncoderV2;

import "./FundDelegator.sol";

contract RariDelegator is FundDelegator {
    constructor(
        FundController _fundController,
        FundManager _fundManager,
        address _semisen
    ) FundDelegator(_fundController, _fundManager, _semisen) {}

    function performSteps(Steps[] calldata steps) public override onlySemicen {
        for (uint256 i = 0; i < steps.length; i++) {
            if (steps[i].actionCode == 0) {
                fundController.depositToPool(
                    steps[i].liquidityPool,
                    steps[i].currencyCode,
                    steps[i].amount
                );
            }

            if (steps[i].actionCode == 1) {
                fundController.withdrawFromPool(
                    steps[i].liquidityPool,
                    steps[i].currencyCode,
                    steps[i].amount
                );
            }
        }
    }
}
