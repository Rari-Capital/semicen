# Semicen

Consensus and reward contracts for Rari's 'semicen' rebalancer system.

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
