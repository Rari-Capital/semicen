# Semicen

Consensus and reward contracts for Rari's 'semicen' rebalancer system.

## Deployment/Development:

**1. Create a .env file and set the `GWEI_GAS_PRICE`, `PRIVATE_KEY`, `INFURA_KEY` and `ETHERSCAN_API_KEY` values.**

```
GWEI_GAS_PRICE=20

PRIVATE_KEY=XXX

INFURA_KEY=XXX
ETHERSCAN_API_KEY=XXX
COINMARKETCAP_API_KEY=XXX
```

**2. Run tests (+ with coverage)**

```npm run test``` or ```npm run coverage```

**3. Deploy contract(s)**

To deploy a Semicen & RariDelegator contract run the command below:

```bash
npm run deploy-semicen-and-delegator -- --network mainnet --epoch-length 21600 --reward-claim-timelock 604800 --fund-manager 0x0000000000000000000000000000000000000000 --fund-controller 0x0000000000000000000000000000000000000000
```

- Make sure to choose an epoch length and claim timelock that you like as well as setting the fund manager and fund controller paramaters to valid addresses.
- You can swap out `mainnet` for either `kovan` or `ropsten` for testing!

You can also deploy a Semicen or RariDelegator contract invidually by running `npm run deploy-semicen` or `npm run deploy-delegator` **(these commands also require flags; run `npx hardhat help deploy-semicen` or `npx hardhat help deploy-delegator` to learn more)**

## What is it?

The `Semicen.sol` contract allows multiple trusted parties (determined by the contract owner) to rebalance a Rari Capital pool on a first-come, first "serve" basis and earn the fees generated during the time their rebalance was active.

## How does it work?

The owner of the contract (Rari team) can add any address as a "trusted rebalancer". These trusted rebalancers can have their rebalancing permissions stripped at any time by the owner.

Trusted rebalancers are allowed to call the `rebalance()` function on the Semicen contract with an array of steps to take to perform their rebalance. Rebalancers may only call this function if the amount of time passed between the last rebalance and the current timestamp is greater or equal to a minimum duration set by the owner. This enforces a minimum amount of time between each rebalance (known as the 'min epoch length'), which may be necessary to prevent constant "one-upping" by the trusted rebalancers attempting to take as many fees as they can (and in the process deviating from the ideal allocation of funds). 

After the minimum delay between the last rebalance and the current time is met (the min epoch length has passed), any of the trusted rebalancers (including the previous one) can call the `rebalance()` function again with a new array of steps. During this call, the contract will calculate how much $ in interest fees were earned from the pool (and should be distributed to the rebalancers) and allocate that amount to the previous rebalancer. 

Any user who has performed a rebalance (even if they have been removed as a trusted rebalancer) can call the `claimRewards()` function to claim the amount of fees that have been earned from their rebalances (and are allocated for rebalancers). Users may only call this function after a delay set by the owner (known as the 'reward claim timelock') from the time of their last rebalance. If the reward claim timelock is 7 days, a rebalancer would have to perform no rebalances for 7 days to claim their rewards. The purpose of the reward claim timelock is to give the owner enough time to review a rebalancer's actions and take proper disciplinary actions (ie: seize their rewards & remove them as trusted rebalancers) if they are not acting correctly.

As mentioned above, the contract owner can seize any amount of the rewards a current/past rebalancer is entitled to as punishment.

## Why?

The benefits/purposes of using a Semicen contract to act as a gateway & proxy rebalances are:

A) Less expenses for the Rari team.  

B) To distribute the work required to calculate the optimal times and steps to perform a good rebalance across multiple actors. This is important when the amount of pools Rari Capital manages grows beyond single digits and into the hundreds.

C) If a single rebalancer is not able to connect to the internet, any of the other trusted rebalancers can continue rebalancing the pool to earn the best returns for its depositors.

## Long term goals

The Semicen contract is a temporary contract meant only to be used while the development of a more decentralized (but more complex) contract is underway. 

This contract is still useful for the reasons listed in the section above but is not a truly decentralized rebalance mechanism. Work is underway on a contract which will be known as `CruiseController.sol` that will reach consensus via proof of stake, allow any RGT holder to participate and feature slashing and other punishments for misbehaviors. However, development time for `CruiseController.sol` is variable due to it's dependence on in-development L2 technologies, which is why the Semicen contract has been developed for use in the meantime. 

## Architecture

- The `Semicen.sol` contract is the only contract rebalancers will interact with. It manages access to the linked `FundController`'s `performSteps()` function (only allows trusted rebalancers, only after min epoch length has passed, etc) and keeps track of the rewards each rebalancer is entitled to. All `Semicen.sol` contracts are bi-directionally linked to a contract that implements the `FundDelegator.sol` abstract contract as mentioned above.

- A FundDelegator contract interacts directly with a `FundManager` and `FundController` contract to calculate the amount of rebalancer fees earned and to perform  "steps" (an array of struct instances that correspond to function calls on the FundDelegator's `FundController` contract) that are sent from the Semicen contract.

The reason for splitting these contracts in two is for upgradability. If a pool's liquidity is migrated to a new FundController to add functions for a new strategy, a new FundDelegator contract that adds support for that function can be created and linked to the same Semicen contract. This two contract solution decouples the reward and access control functionality of the Semicen contract from the logic of executing rebalance steps, which is ideal for Rari's pool system which may have constant strategy additions and updates. It is also more gas efficient as we do not have to redeploy a full new Semicen contract for each strategy update, and when a FundDelegator contract is destroyed, we receive a gas refund.
