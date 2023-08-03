/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  OwlearnModuleBase,
  OwlearnModuleBaseInterface,
} from "../../../src/modules/OwlearnModuleBase";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "creatorId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "courseId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recepient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "certificateTokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "afterMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "creatorId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "courseId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recepient",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "beforeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "creatorId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "courseId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initialiseMintModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owlearnCourse",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class OwlearnModuleBase__factory {
  static readonly abi = _abi;
  static createInterface(): OwlearnModuleBaseInterface {
    return new utils.Interface(_abi) as OwlearnModuleBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwlearnModuleBase {
    return new Contract(address, _abi, signerOrProvider) as OwlearnModuleBase;
  }
}
