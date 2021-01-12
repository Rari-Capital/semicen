// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./delegators/FundDelegator.sol";

contract Semicen is Ownable {
    using SafeMath for uint256;

    /// @dev The FundDelegator instance this Semicen will interact with.
    FundDelegator public fundDelegator;

    /// @notice Timestamp in seconds when the last rebalance occured.
    uint256 public lastRebalance;

    /// @notice The minimum time in seconds before the next rebalance can occur.
    uint256 public minEpochLength;

    /// @notice The minimum time in seconds before a user can claim their rewards after they stop rebalancing.
    uint256 public rewardClaimTimelock;

    /// @notice Maps each epoch start timestamp to the rebalancer who executed it.
    mapping(uint256 => address) public epochRebalancers;

    /// @notice Maps an address to a boolean which will be true if the address is able to rebalance.
    mapping(address => bool) public trustedRebalancers;

    /// @notice Maps each rebalancer (current or past) to the amount of rewards (fees) they can claim.
    mapping(address => uint256) public rebalancerUnclaimedRewards;

    /// @notice Maps each rebalancer (current or past) to the timestamp of their last rebalance.
    mapping(address => uint256) public rebalancerLastRebalance;

    /// @notice Emitted when the fund delegator is updated via setFundDelegator()
    event FundDelegatorUpdated(address indexed newFundDelegator);

    /// @notice Emitted when the min epoch length is updated via setMinEpochLength()
    event MinEpochLengthUpdated(uint256 newMinEpochLength);

    /// @notice Emitted when the reward claim timelock is updated via setRewardClaimTimelock()
    event RewardClaimTimelockUpdated(uint256 newTimelock);

    /// @notice Emitted when a rebalance is conducted.
    event Rebalance(address indexed rebalancer, FundDelegator.Steps[] steps);

    /// @notice Emitted when a rebalancer is added via addRebalancer()
    event RebalancerAdded(address indexed newRebalancer);

    /// @notice Emitted when a rebalancer is removed via removeRebalancer()
    event RebalancerRemoved(address indexed rebalancer);

    /// @notice Emitted when rewards are claimed via claimRewards()
    event RewardsClaimed(address indexed claimer, uint256 amount);

    /// @notice Emitted when rewards are earned in the next call to rebalance()
    event RewardsEarned(address indexed rebalancer, uint256 amount);

    /// @notice Emitted when rewards are seized by the owner via seizeRewards()
    event RewardsSeized(address indexed rewardHolder, uint256 amount);

    /// @dev The amount of unclaimed rewards (scaled by 1e18).
    /// @dev This number would be the same as adding up all the mapped reward amounts in the rebalancerUnclaimedRewards map.
    uint256 internal unclaimedRewardAmount = 0;

    /// @notice Creates a Semicen with a min epoch length.
    /// @notice Adds the sender as a rebalancer.
    /// @param _minEpochLength Amount of seconds that must pass before the next rebalance will be allowed to occur.
    /// @param _rewardClaimTimelock The minimum time in seconds before a user can claim their rewards after they stop rebalancing.
    /// @param _fundDelegator The FundDelegator instance this Semicen will interact with.
    constructor(
        uint256 _minEpochLength,
        uint256 _rewardClaimTimelock,
        FundDelegator _fundDelegator
    ) {
        minEpochLength = _minEpochLength;
        rewardClaimTimelock = _rewardClaimTimelock;

        fundDelegator = _fundDelegator;

        addRebalancer(msg.sender);
    }

    /// @notice Updates the fundDelegator variable. Only the owner can update.
    /// @param newFundDelegator The new FundDelegator instance this Semicen will interact with.
    function setFundDelegator(FundDelegator newFundDelegator)
        external
        onlyOwner
    {
        fundDelegator = newFundDelegator;
        emit FundDelegatorUpdated(address(newFundDelegator));
    }

    /// @notice Updates the minEpochLength variable. Only the owner can update.
    /// @param newMinEpochLength The new min epoch length in seconds.
    function setMinEpochLength(uint256 newMinEpochLength) external onlyOwner {
        minEpochLength = newMinEpochLength;
        emit MinEpochLengthUpdated(newMinEpochLength);
    }

    /// @notice Updates the reward claim timelock. Only the owner can update.
    /// @param newTimelock The minimum time in seconds before a user can claim their rewards after they stop rebalancing.
    function setRewardClaimTimelock(uint256 newTimelock) external onlyOwner {
        rewardClaimTimelock = newTimelock;
        emit RewardClaimTimelockUpdated(newTimelock);
    }

    /// @notice Adds a rebalancer. Only owner can add.
    /// @param newRebalancer The address to add as a rebalancer.
    function addRebalancer(address newRebalancer) public onlyOwner {
        trustedRebalancers[newRebalancer] = true;
        emit RebalancerAdded(newRebalancer);
    }

    /// @notice Removes a rebalancer. Only owner can remove.
    /// @param rebalancer The address to remove.
    function removeRebalancer(address rebalancer) external onlyOwner {
        delete trustedRebalancers[rebalancer];
        emit RebalancerRemoved(rebalancer);
    }

    /// @notice Returns true if at this current time if the minEpochDuration has passed and the pool will accept a new rebalance.
    function hasEpochExpired() public view returns (bool) {
        return block.timestamp >= (lastRebalance + minEpochLength);
    }

    /// @notice Performs a rebalance by shifting the pool's allocations.
    /// @notice The rebalancer will get the fees earned from their rebalance when the next one takes place.
    function rebalance(FundDelegator.Steps[] calldata steps) public {
        require(
            trustedRebalancers[msg.sender],
            "You must be a trusted rebalancer!"
        );

        require(
            hasEpochExpired(),
            "You must wait out the full min epoch duration."
        );

        // If this is not the first rebalance, increment the last rebalancer's unclaimed rewards by the amount of fees earned.
        if (lastRebalance > 0) {
            uint256 feesEarned =
                fundDelegator.getTotalUnclaimedRebalancerFees().sub(
                    unclaimedRewardAmount
                );

            address previousRebalancer = epochRebalancers[lastRebalance];

            rebalancerUnclaimedRewards[
                previousRebalancer
            ] = rebalancerUnclaimedRewards[previousRebalancer].add(feesEarned);

            unclaimedRewardAmount = unclaimedRewardAmount.add(feesEarned);

            emit RewardsEarned(previousRebalancer, feesEarned);
        }

        fundDelegator.performSteps(steps);

        uint256 timestamp = block.timestamp;

        lastRebalance = timestamp;

        rebalancerLastRebalance[msg.sender] = timestamp;

        epochRebalancers[timestamp] = msg.sender;

        emit Rebalance(msg.sender, steps);
    }

    /// @notice Claims all rewards earned (transfers fees earned in the form of erc20s/eth back to the sender)
    function claimRewards() external {
        require(
            (block.timestamp - rebalancerLastRebalance[msg.sender]) >=
                rewardClaimTimelock,
            "You must stop rebalancing and wait out the reward claim timelock before claiming."
        );

        uint256 rewardsToClaim = rebalancerUnclaimedRewards[msg.sender];

        // Remove their unclaimed rewards as they are now claimed.
        delete rebalancerUnclaimedRewards[msg.sender];

        // Lower the unclaimed reward amount by the amount being claimed.
        unclaimedRewardAmount = unclaimedRewardAmount.sub(rewardsToClaim);

        // Send the interest to the sender.
        fundDelegator.withdrawRebalancerFees(rewardsToClaim, msg.sender);

        emit RewardsClaimed(msg.sender, rewardsToClaim);
    }

    /// @notice Seize unclaimed rewards from a user with unclaimed rewards. Only can be called by the owner.
    /// @param rewardHolder The user to seize the rewards from.
    /// @param amount The amount of rewards to seize. Must be equal to or less than the unclaimed rewards balance of the `rewardHolder`.
    function seizeRewards(address rewardHolder, uint256 amount)
        external
        onlyOwner
    {
        require(
            rebalancerUnclaimedRewards[rewardHolder] >= amount,
            "This reward holder does not have enough rewards to seize this amount"
        );

        // Remove the amount from the rewardHolder
        rebalancerUnclaimedRewards[rewardHolder] -= amount;

        // Transfer the removed rewards to the owner of the contract.
        rebalancerUnclaimedRewards[msg.sender] = rebalancerUnclaimedRewards[
            msg.sender
        ]
            .add(amount);

        emit RewardsSeized(rewardHolder, amount);
    }
}
