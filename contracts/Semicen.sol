// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/FundController.sol";
import "./interfaces/FundManager.sol";
import "hardhat/console.sol";

contract Semicen is Ownable {
    /// @dev The FundManager instance this Semicen will interact with.
    FundManager internal fundManager;

    /// @dev The fundController instance this Semicen will interact with.
    FundController internal fundController;

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

    /// @notice Emitted when the fundManager variable is updated via setFundManager()
    event FundManagerUpdated(address indexed newFundManager);

    /// @notice Emitted when the fundController variable is updated via setFundController()
    event FundControllerUpdated(address indexed newFundController);

    /// @notice Emitted when the min epoch length is updated via setMinEpochLength()
    event MinEpochLengthUpdated(uint256 newMinEpochLength);

    /// @notice Emitted when the reward claim timelock is updated via setRewardClaimTimelock()
    event RewardClaimTimelockUpdated(uint256 newTimelock);

    /// @notice Emitted when a rebalance is conducted.
    /// @param rebalancer The address who called the rebalance() function.
    event Rebalance(address indexed rebalancer);

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
    /// @param _minEpochLength The minimum time in seconds before a user can claim their rewards after they stop rebalancing.
    constructor(
        uint256 _minEpochLength,
        uint256 _rewardClaimTimelock,
        FundController _fundController,
        FundManager _fundManager
    ) {
        minEpochLength = _minEpochLength;
        rewardClaimTimelock = _rewardClaimTimelock;

        fundController = _fundController;
        fundManager = _fundManager;

        addRebalancer(msg.sender);
    }

    /// @notice Updates the fundManager variable. Only the only can update.
    /// @param newFundManager The new fundManager.
    function setFundManager(FundManager newFundManager) external onlyOwner {
        fundManager = newFundManager;
        emit FundManagerUpdated(address(newFundManager));
    }

    /// @notice Updates the fundController variable. Only the only can update.
    /// @param newFundController The new fundController.
    function setFundController(FundController newFundController)
        external
        onlyOwner
    {
        fundController = newFundController;
        emit FundControllerUpdated(address(newFundController));
    }

    /// @notice Updates the minEpochLength variable. Only the only can update.
    /// @param newMinEpochLength The new min epoch length in seconds.
    function setMinEpochLength(uint256 newMinEpochLength) external onlyOwner {
        minEpochLength = newMinEpochLength;
        emit MinEpochLengthUpdated(newMinEpochLength);
    }

    /// @notice Updates the reward claim timelock. Only the only can update.
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
        console.log("my pussy burns");

        return block.timestamp > (lastRebalance + minEpochLength);
    }

    /// @dev A struct with properties that correspond to the arguments of depositToPool() and withdrawFromPool()
    struct Allocation {
        uint256 liquidityPool;
        string currencyCode;
        uint256 amount;
    }

    /// @notice Performs a rebalance by shifting the pool's allocations.
    /// @notice The rebalancer will get the fees earned from their rebalance when the next one takes place.
    function rebalance(Allocation[] calldata allocations) public {
        require(
            trustedRebalancers[msg.sender],
            "You must be a trusted rebalancer!"
        );

        require(
            hasEpochExpired(),
            "You must wait out the min full epoch duration."
        );

        // If this is not the first rebalance, increment the last rebalancer's unclaimed rewards by the amount of fees earned.
        if (lastRebalance > 0) {
            uint256 feesEarned =
                fundManager.getInterestFeesUnclaimed() - unclaimedRewardAmount;

            address previousRebalancer = epochRebalancers[lastRebalance];

            rebalancerUnclaimedRewards[previousRebalancer] += feesEarned;

            unclaimedRewardAmount += feesEarned;

            emit RewardsEarned(previousRebalancer, feesEarned);
        }

        // TODO: TESTING MOCK THIS WON'T WORK
        for (uint256 i = 0; i < allocations.length; i++) {
            fundController.depositToPool(
                allocations[i].liquidityPool,
                allocations[i].currencyCode,
                allocations[i].amount
            );
        }

        uint256 timestamp = block.timestamp;

        lastRebalance = timestamp;

        epochRebalancers[timestamp] = msg.sender;

        emit Rebalance(msg.sender);
    }

    /// @notice Claims all rewards earned (transfers fees earned in the form of erc20s/eth back to the sender)
    function claimRewards() external {
        require(
            (block.timestamp - rebalancerLastRebalance[msg.sender]) >
                rewardClaimTimelock,
            "You must stop rebalancing and wait out the reward claim timelock before claiming."
        );

        uint256 rewardsToClaim = rebalancerUnclaimedRewards[msg.sender];

        // Remove their unclaimed rewards as they are now claimed.
        delete rebalancerUnclaimedRewards[msg.sender];

        // Lower the unclaimed reward amount by the amount being claimed.
        unclaimedRewardAmount -= rewardsToClaim;

        // Send the interest to the sender.
        fundManager.withdrawInterestFees(rewardsToClaim, msg.sender);

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
            amount >= rebalancerUnclaimedRewards[rewardHolder],
            "This reward holder does not have enough rewards to seize this amount"
        );

        // Remove the amount from the rewardHolder
        rebalancerUnclaimedRewards[rewardHolder] - amount;

        // Transfer the removed rewards to the owner of the contract.
        rebalancerUnclaimedRewards[owner()] += amount;

        emit RewardsSeized(rewardHolder, amount);
    }
}
