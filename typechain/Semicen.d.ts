/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface SemicenContract extends Truffle.Contract<SemicenInstance> {
  "new"(
    _minEpochLength: number | BN | string,
    _rewardClaimTimelock: number | BN | string,
    _fundController: string,
    _fundManager: string,
    meta?: Truffle.TransactionDetails
  ): Promise<SemicenInstance>;
}

export interface FundControllerUpdated {
  name: "FundControllerUpdated";
  args: {
    newFundController: string;
    0: string;
  };
}

export interface FundManagerUpdated {
  name: "FundManagerUpdated";
  args: {
    newFundManager: string;
    0: string;
  };
}

export interface MinEpochLengthUpdated {
  name: "MinEpochLengthUpdated";
  args: {
    newMinEpochLength: BN;
    0: BN;
  };
}

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

export interface Rebalance {
  name: "Rebalance";
  args: {
    rebalancer: string;
    steps: string[];
    0: string;
    1: string[];
  };
}

export interface RebalancerAdded {
  name: "RebalancerAdded";
  args: {
    newRebalancer: string;
    0: string;
  };
}

export interface RebalancerRemoved {
  name: "RebalancerRemoved";
  args: {
    rebalancer: string;
    0: string;
  };
}

export interface RewardClaimTimelockUpdated {
  name: "RewardClaimTimelockUpdated";
  args: {
    newTimelock: BN;
    0: BN;
  };
}

export interface RewardsClaimed {
  name: "RewardsClaimed";
  args: {
    claimer: string;
    amount: BN;
    0: string;
    1: BN;
  };
}

export interface RewardsEarned {
  name: "RewardsEarned";
  args: {
    rebalancer: string;
    amount: BN;
    0: string;
    1: BN;
  };
}

export interface RewardsSeized {
  name: "RewardsSeized";
  args: {
    rewardHolder: string;
    amount: BN;
    0: string;
    1: BN;
  };
}

type AllEvents =
  | FundControllerUpdated
  | FundManagerUpdated
  | MinEpochLengthUpdated
  | OwnershipTransferred
  | Rebalance
  | RebalancerAdded
  | RebalancerRemoved
  | RewardClaimTimelockUpdated
  | RewardsClaimed
  | RewardsEarned
  | RewardsSeized;

export interface SemicenInstance extends Truffle.ContractInstance {
  addRebalancer: {
    (newRebalancer: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newRebalancer: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newRebalancer: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newRebalancer: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  c_0x2e703585(
    c__0x2e703585: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  claimRewards: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  epochRebalancers(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  fundController(txDetails?: Truffle.TransactionDetails): Promise<string>;

  fundManager(txDetails?: Truffle.TransactionDetails): Promise<string>;

  hasEpochExpired(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  lastRebalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  minEpochLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  rebalance: {
    (steps: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      steps: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      steps: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      steps: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  rebalancerLastRebalance(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  rebalancerUnclaimedRewards(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  removeRebalancer: {
    (rebalancer: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      rebalancer: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      rebalancer: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      rebalancer: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  rewardClaimTimelock(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  seizeRewards: {
    (
      rewardHolder: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      rewardHolder: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      rewardHolder: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      rewardHolder: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setFundController: {
    (
      newFundController: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      newFundController: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newFundController: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newFundController: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setFundManager: {
    (newFundManager: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newFundManager: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newFundManager: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newFundManager: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setMinEpochLength: {
    (
      newMinEpochLength: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      newMinEpochLength: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newMinEpochLength: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newMinEpochLength: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setRewardClaimTimelock: {
    (
      newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newTimelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  transferOwnership: {
    (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  trustedRebalancers(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  methods: {
    addRebalancer: {
      (newRebalancer: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newRebalancer: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newRebalancer: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newRebalancer: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    c_0x2e703585(
      c__0x2e703585: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;

    claimRewards: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    epochRebalancers(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    fundController(txDetails?: Truffle.TransactionDetails): Promise<string>;

    fundManager(txDetails?: Truffle.TransactionDetails): Promise<string>;

    hasEpochExpired(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    lastRebalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    minEpochLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    rebalance: {
      (steps: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        steps: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        steps: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        steps: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    rebalancerLastRebalance(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    rebalancerUnclaimedRewards(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    removeRebalancer: {
      (rebalancer: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        rebalancer: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        rebalancer: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        rebalancer: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    rewardClaimTimelock(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    seizeRewards: {
      (
        rewardHolder: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        rewardHolder: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        rewardHolder: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        rewardHolder: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setFundController: {
      (
        newFundController: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        newFundController: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newFundController: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newFundController: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setFundManager: {
      (newFundManager: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newFundManager: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newFundManager: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newFundManager: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setMinEpochLength: {
      (
        newMinEpochLength: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        newMinEpochLength: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newMinEpochLength: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newMinEpochLength: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setRewardClaimTimelock: {
      (
        newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newTimelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    transferOwnership: {
      (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    trustedRebalancers(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
