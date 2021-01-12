/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MockFundControllerContract
  extends Truffle.Contract<MockFundControllerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MockFundControllerInstance>;
}

type AllEvents = never;

export interface MockFundControllerInstance extends Truffle.ContractInstance {
  c_0x945749f6(
    c__0x945749f6: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<void>;

  depositToPool: {
    (
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  withdrawFromPool: {
    (
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      pool: number | BN | string,
      currencyCode: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    c_0x945749f6(
      c__0x945749f6: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;

    depositToPool: {
      (
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    withdrawFromPool: {
      (
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        pool: number | BN | string,
        currencyCode: string,
        amount: number | BN | string,
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