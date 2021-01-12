/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface RariDelegatorContract
  extends Truffle.Contract<RariDelegatorInstance> {
  "new"(
    _fundController: string,
    _fundManager: string,
    _semisen: string,
    meta?: Truffle.TransactionDetails
  ): Promise<RariDelegatorInstance>;
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

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

export interface SemicenUpdated {
  name: "SemicenUpdated";
  args: {
    newsemicen: string;
    0: string;
  };
}

type AllEvents =
  | FundControllerUpdated
  | FundManagerUpdated
  | OwnershipTransferred
  | SemicenUpdated;

export interface RariDelegatorInstance extends Truffle.ContractInstance {
  c_0x30bf6ae5(
    c__0x30bf6ae5: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  c_0xb6cc993a(
    c__0xb6cc993a: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  destroy: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  fundController(txDetails?: Truffle.TransactionDetails): Promise<string>;

  fundManager(txDetails?: Truffle.TransactionDetails): Promise<string>;

  getTotalUnclaimedRebalancerFees: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<BN>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  performSteps: {
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

  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  semicen(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

  setSemicen: {
    (newSemicen: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newSemicen: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newSemicen: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newSemicen: string,
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

  withdrawRebalancerFees: {
    (
      amount: number | BN | string,
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amount: number | BN | string,
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      amount: number | BN | string,
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amount: number | BN | string,
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    c_0x30bf6ae5(
      c__0x30bf6ae5: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;

    c_0xb6cc993a(
      c__0xb6cc993a: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;

    destroy: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    fundController(txDetails?: Truffle.TransactionDetails): Promise<string>;

    fundManager(txDetails?: Truffle.TransactionDetails): Promise<string>;

    getTotalUnclaimedRebalancerFees: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<BN>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    performSteps: {
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

    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    semicen(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

    setSemicen: {
      (newSemicen: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newSemicen: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newSemicen: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newSemicen: string,
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

    withdrawRebalancerFees: {
      (
        amount: number | BN | string,
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amount: number | BN | string,
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        amount: number | BN | string,
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amount: number | BN | string,
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
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
