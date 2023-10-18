/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface OwlearnIdStorageInterface extends utils.Interface {
  functions: {
    "allowlistMerkleRoot()": FunctionFragment;
    "blackListNameMerkleRoot()": FunctionFragment;
    "domainNames(string)": FunctionFragment;
    "domainRecords(address)": FunctionFragment;
    "lensHub()": FunctionFragment;
    "tld()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allowlistMerkleRoot"
      | "blackListNameMerkleRoot"
      | "domainNames"
      | "domainRecords"
      | "lensHub"
      | "tld"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allowlistMerkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "blackListNameMerkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "domainNames",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "domainRecords",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "lensHub", values?: undefined): string;
  encodeFunctionData(functionFragment: "tld", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "allowlistMerkleRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blackListNameMerkleRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "domainNames",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "domainRecords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lensHub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tld", data: BytesLike): Result;

  events: {};
}

export interface OwlearnIdStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OwlearnIdStorageInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    allowlistMerkleRoot(overrides?: CallOverrides): Promise<[string]>;

    blackListNameMerkleRoot(overrides?: CallOverrides): Promise<[string]>;

    domainNames(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        domain: string;
        user: string;
        tokenId: BigNumber;
      }
    >;

    domainRecords(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    lensHub(overrides?: CallOverrides): Promise<[string]>;

    tld(overrides?: CallOverrides): Promise<[string]>;
  };

  allowlistMerkleRoot(overrides?: CallOverrides): Promise<string>;

  blackListNameMerkleRoot(overrides?: CallOverrides): Promise<string>;

  domainNames(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber] & {
      domain: string;
      user: string;
      tokenId: BigNumber;
    }
  >;

  domainRecords(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  lensHub(overrides?: CallOverrides): Promise<string>;

  tld(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    allowlistMerkleRoot(overrides?: CallOverrides): Promise<string>;

    blackListNameMerkleRoot(overrides?: CallOverrides): Promise<string>;

    domainNames(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        domain: string;
        user: string;
        tokenId: BigNumber;
      }
    >;

    domainRecords(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    lensHub(overrides?: CallOverrides): Promise<string>;

    tld(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    allowlistMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    blackListNameMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    domainNames(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    domainRecords(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lensHub(overrides?: CallOverrides): Promise<BigNumber>;

    tld(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    allowlistMerkleRoot(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    blackListNameMerkleRoot(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    domainNames(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    domainRecords(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lensHub(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tld(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
