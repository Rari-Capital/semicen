/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface SemicenContract extends Truffle.Contract<SemicenInstance> {
  "new"(
    _minEpochLength: number | BN | string,
    _rewardClaimTimelock: number | BN | string,
    _fundDelegator: string,
    meta?: Truffle.TransactionDetails
  ): Promise<SemicenInstance>;
}

export interface FundDelegatorUpdated {
  name: "FundDelegatorUpdated";
  args: {
    newFundDelegator: string;
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
    steps: {
      actionCode: BN;
      liquidityPool: BN;
      currencyCode: string;
      amount: BN;
    }[];
    0: string;
    1: {
      actionCode: BN;
      liquidityPool: BN;
      currencyCode: string;
      amount: BN;
    }[];
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
  | FundDelegatorUpdated
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

  fundDelegator(txDetails?: Truffle.TransactionDetails): Promise<string>;

  hasEpochExpired(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  lastRebalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  minEpochLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  rebalance: {
    (
      steps: {
        actionCode: number | BN | string;
        liquidityPool: number | BN | string;
        currencyCode: string;
        amount: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      steps: {
        actionCode: number | BN | string;
        liquidityPool: number | BN | string;
        currencyCode: string;
        amount: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      steps: {
        actionCode: number | BN | string;
        liquidityPool: number | BN | string;
        currencyCode: string;
        amount: number | BN | string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      steps: {
        actionCode: number | BN | string;
        liquidityPool: number | BN | string;
        currencyCode: string;
        amount: number | BN | string;
      }[],
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

  setFundDelegator: {
    (newFundDelegator: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newFundDelegator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newFundDelegator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newFundDelegator: string,
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

    fundDelegator(txDetails?: Truffle.TransactionDetails): Promise<string>;

    hasEpochExpired(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    lastRebalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    minEpochLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    rebalance: {
      (
        steps: {
          actionCode: number | BN | string;
          liquidityPool: number | BN | string;
          currencyCode: string;
          amount: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        steps: {
          actionCode: number | BN | string;
          liquidityPool: number | BN | string;
          currencyCode: string;
          amount: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        steps: {
          actionCode: number | BN | string;
          liquidityPool: number | BN | string;
          currencyCode: string;
          amount: number | BN | string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        steps: {
          actionCode: number | BN | string;
          liquidityPool: number | BN | string;
          currencyCode: string;
          amount: number | BN | string;
        }[],
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

    setFundDelegator: {
      (
        newFundDelegator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        newFundDelegator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newFundDelegator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newFundDelegator: string,
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
