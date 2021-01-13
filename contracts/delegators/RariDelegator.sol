// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;
pragma experimental ABIEncoderV2;

import "./FundDelegator.sol";

contract RariDelegator is FundDelegator {
    constructor(
        IFundController _fundController,
        IFundManager _fundManager,
        address _semisen
    ) FundDelegator(_fundController, _fundManager, _semisen) {}

    function performSteps(Steps[] calldata steps)
        external
        override
        onlySemicen
    {
        for (uint256 i = 0; i < steps.length; i++) {
            // 0: Approve to pool
            if (steps[i].actionCode == 0) {
                fundController.approveToPool(
                    steps[i].liquidityPool,
                    steps[i].inputCurrencyCode,
                    steps[i].amount
                );
            }

            // 1: Deposit to pool
            if (steps[i].actionCode == 1) {
                fundController.depositToPool(
                    steps[i].liquidityPool,
                    steps[i].inputCurrencyCode,
                    steps[i].amount
                );
            }

            // 2: Withdraw from pool
            if (steps[i].actionCode == 2) {
                fundController.withdrawFromPool(
                    steps[i].liquidityPool,
                    steps[i].inputCurrencyCode,
                    steps[i].amount
                );
            }

            // 3: Approve to mStable
            if (steps[i].actionCode == 3) {
                fundController.approveToMUsd(
                    steps[i].inputCurrencyCode,
                    steps[i].amount
                );
            }

            // 4: Swap on mStable
            if (steps[i].actionCode == 4) {
                fundController.swapMStable(
                    steps[i].inputCurrencyCode,
                    steps[i].outputCurrencyCode,
                    steps[i].amount
                );
            }
        }
    }
}
