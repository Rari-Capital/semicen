// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface IFundController {
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

interface IFundManager {
    function getRebalancerPercentage() external returns (uint256);

    function getInterestFeesUnclaimed() external returns (uint256);

    function withdrawInterestFees(uint256 amount, address to) external;
}

abstract contract FundDelegator is Ownable {
    using SafeMath for uint256;

    /// @dev The fundController instance this Semicen will interact with.
    IFundController public fundController;

    /// @dev The FundManager instance this Semicen will interact with.
    IFundManager public fundManager;

    /// @dev The Semicen contract that will delegate it's steps to this contract for execution.
    address public semicen;

    /// @notice Emitted when the fundController variable is updated via setFundController()
    event FundControllerUpdated(address indexed newFundController);

    /// @notice Emitted when the fundManager variable is updated via setFundManager()
    event FundManagerUpdated(address indexed newFundManager);

    /// @notice Emitted when the semicen variable is updated via setSemicen()
    event SemicenUpdated(address indexed newsemicen);

    /// @notice Creates a FundDelegator with a fundController.
    /// @param _fundController The FundController this contract will interact with.
    /// @param _fundManager The FundManager instance this Semicen will interact with.
    /// @param _semicen The semicen contract that will delegate it's steps to this contract for execution.
    constructor(
        IFundController _fundController,
        IFundManager _fundManager,
        address _semicen
    ) {
        fundController = _fundController;
        fundManager = _fundManager;
        semicen = _semicen;
    }

    /// @notice Destroys this contract and sends all its ether to the owner.
    /// @notice Can only be called by the owner.
    function destroy() public onlyOwner {
        selfdestruct(msg.sender);
    }

    /// @notice Updates the fundController variable. Only the owner can update.
    /// @param newFundController The new fundController.
    function setFundController(IFundController newFundController)
        external
        onlyOwner
    {
        fundController = newFundController;
        emit FundControllerUpdated(address(newFundController));
    }

    /// @notice Updates the fundManager variable. Only the owner can update.
    /// @param newFundManager The new fundManager.
    function setFundManager(IFundManager newFundManager) external onlyOwner {
        fundManager = newFundManager;
        emit FundManagerUpdated(address(newFundManager));
    }

    /// @notice Updates the semicen variable. Only the owner can update.
    /// @param newSemicen The new semicen.
    function setSemicen(address newSemicen) external onlyOwner {
        semicen = newSemicen;
        emit SemicenUpdated(newSemicen);
    }

    /// @notice Returns the the total amount of unclaimed fees rebalancers are entitled to.
    function getTotalUnclaimedRebalancerFees() external returns (uint256) {
        return
            fundManager
                .getInterestFeesUnclaimed()
                .mul(fundManager.getRebalancerPercentage())
                .div(1e18);
    }

    modifier onlySemicen {
        require(
            msg.sender == semicen,
            "Only the Semicen can call this method!"
        );

        _;
    }

    /// @notice Withdraws a specific amount rebalancer fees and sends them to a specified address.
    /// @param amount The amount in USD of fees to withdraw.
    /// @param to The address of the user to send the withdrawn fees to.
    function withdrawRebalancerFees(uint256 amount, address to)
        external
        onlySemicen
    {
        fundManager.withdrawInterestFees(amount, to);
    }

    /// @dev A struct that contains the details neccessary to call any of the possible action code's corresponding functions on the FundController.
    struct Steps {
        // 0: Deposit
        // 1: Withdraw
        uint256 actionCode;
        uint256 liquidityPool;
        string currencyCode;
        uint256 amount;
    }

    /// @notice Performs the steps given by calling the corresponding methods on the FundController contract.
    /// @dev This method should be implemented with the `onlySemicen` modifier.
    /// @param steps The steps to perform.
    function performSteps(Steps[] calldata steps) external virtual;
}
