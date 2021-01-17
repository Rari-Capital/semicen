# [RIP-12] Switch to Semicen rebalance system and reward trusted rebalancers

## Background:

Rari Capital plans to expand the amount of pools it offers significantly, which increases the amount of gas the Rari Capital team has to pay to perform rebalances for its users. At a certian point it becomes necessary to distribute the task of rebalancing between multiple parties for redundancy and reward those parties with fees, which is why this proposal has been created to begin the migration proccess to a more decentralized and scalable rebalance system. 

## Abstract:

The Rari Capital team has developed a contract which we call the "Semicen" rebalance layer. 
This contract when given the permission to trigger rebalances allows multiple trusted parties (added and managed by the Rari Capital DAO) to rebalance a pool on a first-come, first "serve" basis and earn the fees generated during the time their rebalance was active.

Rebalancers can only move funds between integrated protocols (no sending to EOAs or untrusted wallets) and the Rari Capital team can punish rebalancers that misbehave. Users funds are at 0 risk even if a trusted rebalancer goes rouge.

- This proposal, if passed, will grant the RCAP team permission to swap out the current centralized rebalancer address for the Semicen contract. 

- It also grants the team permission to update the performance fee allocations by lowering the amount of fees that are sent to the smart treasury (currently 45%) to a minimum of 35% and allocate up to 10% of interest fees earned to rewarding rebalancers. The allocation of rebalancer fees will be dynamically lowered to ensure rebalancers are only earning a minimal amount of profit (earnings after gas costs).
  - It may be neccessary to re-evaluate the amount of fees that are allocated to rebalancers in the future which is why this proposal gives a safe amount of flexibility (a max of 10% of the pool's performance fees given to rebalancers, can be lowered without a vote) but also is aware that it may be neccessary to re-evaluate the allocations in the future if pool liquidity/or gas costs change dramatically.

#### To learn more about the technical details and implementation of the Semicen contract, you are welcome to view the Github repo at https://github.com/Rari-Capital/semicen!
  
## Motivation:

A) Allow Rari Capital to scale it's pool capacity by taking the fee burden off of the Rari Capital team's shoulders.

B) To distribute the work required to calculate the optimal times and steps to perform a good rebalance across multiple actors. **This is important when the amount of pools Rari Capital manages grows beyond single digits and into the hundreds.**

C) If a single rebalancer is not able to connect to the internet, any of the other trusted rebalancers can continue rebalancing the pool to earn the best returns for its depositors.

## Long term goals
The Semicen contract is a temporary contract meant to be used while the development of a more decentralized (but more complex) solution is underway.

This contract is still useful for the reasons listed in the section above but is not a truly decentralized rebalance mechanism. 

Work is underway on a contract which will reach consensus via proof of stake, allow any RGT holder to participate and feature slashing and other punishments for misbehaviors. 

However, development time for this upgraded system is variable due to it's dependence on in-development L2 technologies, which is why the Semicen contract has been developed for use in the meantime.
