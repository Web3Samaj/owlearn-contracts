/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
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

export interface IMintModuleInterface extends utils.Interface {
  functions: {
    "afterMint(uint256,uint256,address,uint256,bytes)": FunctionFragment;
    "beforeMint(uint256,uint256,address,bytes)": FunctionFragment;
    "initialiseMintModule(uint256,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "afterMint" | "beforeMint" | "initialiseMintModule"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "afterMint",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "beforeMint",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialiseMintModule",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "afterMint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "beforeMint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialiseMintModule",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IMintModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMintModuleInterface;

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
    afterMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      recepient: PromiseOrValue<string>,
      certificateTokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    beforeMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialiseMintModule(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  afterMint(
    creatorId: PromiseOrValue<BigNumberish>,
    courseId: PromiseOrValue<BigNumberish>,
    recepient: PromiseOrValue<string>,
    certificateTokenId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  beforeMint(
    creatorId: PromiseOrValue<BigNumberish>,
    courseId: PromiseOrValue<BigNumberish>,
    user: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialiseMintModule(
    creatorId: PromiseOrValue<BigNumberish>,
    courseId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    afterMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      recepient: PromiseOrValue<string>,
      certificateTokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    beforeMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    initialiseMintModule(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    afterMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      recepient: PromiseOrValue<string>,
      certificateTokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    beforeMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialiseMintModule(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    afterMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      recepient: PromiseOrValue<string>,
      certificateTokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    beforeMint(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      user: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialiseMintModule(
      creatorId: PromiseOrValue<BigNumberish>,
      courseId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
