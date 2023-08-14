/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OwlearnCourseResource,
  OwlearnCourseResourceInterface,
} from "../../../../src/extras/OwlearnCourse2.sol/OwlearnCourseResource";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "courseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "courseSymbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f7838038062001f78833981016040819052620000349162000193565b818160006200004483826200028c565b5060016200005382826200028c565b505050620000706200006a6200007860201b60201c565b6200007c565b505062000358565b3390565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000f657600080fd5b81516001600160401b0380821115620001135762000113620000ce565b604051601f8301601f19908116603f011681019082821181831017156200013e576200013e620000ce565b816040528381526020925086838588010111156200015b57600080fd5b600091505b838210156200017f578582018301518183018401529082019062000160565b600093810190920192909252949350505050565b60008060408385031215620001a757600080fd5b82516001600160401b0380821115620001bf57600080fd5b620001cd86838701620000e4565b93506020850151915080821115620001e457600080fd5b50620001f385828601620000e4565b9150509250929050565b600181811c908216806200021257607f821691505b6020821081036200023357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200028757600081815260208120601f850160051c81016020861015620002625750805b601f850160051c820191505b8181101562000283578281556001016200026e565b5050505b505050565b81516001600160401b03811115620002a857620002a8620000ce565b620002c081620002b98454620001fd565b8462000239565b602080601f831160018114620002f85760008415620002df5750858301515b600019600386901b1c1916600185901b17855562000283565b600085815260208120601f198616915b82811015620003295788860151825594840194600190910190840162000308565b5085821015620003485787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611c1080620003686000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c8063715018a6116100b2578063b88d4fde11610081578063cd279c7c11610066578063cd279c7c1461027f578063e985e9c514610292578063f2fde38b146102ce57600080fd5b8063b88d4fde14610259578063c87b56dd1461026c57600080fd5b8063715018a6146102255780638da5cb5b1461022d57806395d89b411461023e578063a22cb4651461024657600080fd5b806323b872dd1161010957806342966c68116100ee57806342966c68146101de5780636352211e146101f157806370a082311461020457600080fd5b806323b872dd146101b857806342842e0e146101cb57600080fd5b806301ffc9a71461013b57806306fdde0314610163578063081812fc14610178578063095ea7b3146101a3575b600080fd5b61014e6101493660046116f2565b6102e1565b60405190151581526020015b60405180910390f35b61016b6102f2565b60405161015a919061175f565b61018b610186366004611772565b610384565b6040516001600160a01b03909116815260200161015a565b6101b66101b13660046117a7565b6103ab565b005b6101b66101c63660046117d1565b6104e1565b6101b66101d93660046117d1565b610559565b6101b66101ec366004611772565b610574565b61018b6101ff366004611772565b6105eb565b61021761021236600461180d565b610650565b60405190815260200161015a565b6101b66106ea565b6007546001600160a01b031661018b565b61016b6106fe565b6101b6610254366004611828565b61070d565b6101b66102673660046118f0565b61071c565b61016b61027a366004611772565b61079a565b6101b661028d36600461196c565b6107a5565b61014e6102a03660046119d7565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101b66102dc36600461180d565b6107c1565b60006102ec8261084e565b92915050565b60606000805461030190611a0a565b80601f016020809104026020016040519081016040528092919081815260200182805461032d90611a0a565b801561037a5780601f1061034f5761010080835404028352916020019161037a565b820191906000526020600020905b81548152906001019060200180831161035d57829003601f168201915b5050505050905090565b600061038f8261088c565b506000908152600460205260409020546001600160a01b031690565b60006103b6826105eb565b9050806001600160a01b0316836001600160a01b0316036104445760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b336001600160a01b0382161480610460575061046081336102a0565b6104d25760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000606482015260840161043b565b6104dc83836108f0565b505050565b6104ec335b8261095e565b61054e5760405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b606482015260840161043b565b6104dc8383836109dd565b6104dc8383836040518060200160405280600081525061071c565b61057d336104e6565b6105df5760405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b606482015260840161043b565b6105e881610bd6565b50565b6000818152600260205260408120546001600160a01b0316806102ec5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161043b565b60006001600160a01b0382166106ce5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e65720000000000000000000000000000000000000000000000606482015260840161043b565b506001600160a01b031660009081526003602052604090205490565b6106f2610bdf565b6106fc6000610c39565b565b60606001805461030190611a0a565b610718338383610c8b565b5050565b610726338361095e565b6107885760405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b606482015260840161043b565b61079484848484610d59565b50505050565b60606102ec82610dd7565b6107ad610bdf565b6107b78383610edf565b6104dc8282610ef9565b6107c9610bdf565b6001600160a01b0381166108455760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161043b565b6105e881610c39565b60006001600160e01b031982167f490649060000000000000000000000000000000000000000000000000000000014806102ec57506102ec82610fd3565b6000818152600260205260409020546001600160a01b03166105e85760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161043b565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610925826105eb565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061096a836105eb565b9050806001600160a01b0316846001600160a01b031614806109b157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806109d55750836001600160a01b03166109ca84610384565b6001600160a01b0316145b949350505050565b826001600160a01b03166109f0826105eb565b6001600160a01b031614610a545760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161043b565b6001600160a01b038216610acf5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161043b565b826001600160a01b0316610ae2826105eb565b6001600160a01b031614610b465760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161043b565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6105e88161106e565b6007546001600160a01b031633146106fc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161043b565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031603610cec5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161043b565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610d648484846109dd565b610d70848484846110ae565b6107945760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161043b565b6060610de28261088c565b60008281526006602052604081208054610dfb90611a0a565b80601f0160208091040260200160405190810160405280929190818152602001828054610e2790611a0a565b8015610e745780601f10610e4957610100808354040283529160200191610e74565b820191906000526020600020905b815481529060010190602001808311610e5757829003601f168201915b505050505090506000610e9260408051602081019091526000815290565b90508051600003610ea4575092915050565b815115610ed6578082604051602001610ebe929190611a44565b60405160208183030381529060405292505050919050565b6109d5846111fa565b61071882826040518060200160405280600081525061126e565b6000828152600260205260409020546001600160a01b0316610f835760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201527f6578697374656e7420746f6b656e000000000000000000000000000000000000606482015260840161043b565b6000828152600660205260409020610f9b8282611ac1565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b60006001600160e01b031982167f80ac58cd00000000000000000000000000000000000000000000000000000000148061103657506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806102ec57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316146102ec565b611077816112ec565b6000818152600660205260409020805461109090611a0a565b1590506105e85760008181526006602052604081206105e89161168e565b60006001600160a01b0384163b156111ef57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906110f2903390899088908890600401611b81565b6020604051808303816000875af192505050801561112d575060408051601f3d908101601f1916820190925261112a91810190611bbd565b60015b6111d5573d80801561115b576040519150601f19603f3d011682016040523d82523d6000602084013e611160565b606091505b5080516000036111cd5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161043b565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506109d5565b506001949350505050565b60606112058261088c565b600061121c60408051602081019091526000815290565b9050600081511161123c5760405180602001604052806000815250611267565b8061124684611381565b604051602001611257929190611a44565b6040516020818303038152906040525b9392505050565b6112788383611421565b61128560008484846110ae565b6104dc5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606482015260840161043b565b60006112f7826105eb565b9050611302826105eb565b600083815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526003845282852080546000190190558785526002909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6060600061138e836115ac565b600101905060008167ffffffffffffffff8111156113ae576113ae611864565b6040519080825280601f01601f1916602001820160405280156113d8576020820181803683370190505b5090508181016020015b600019017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85049450846113e257509392505050565b6001600160a01b0382166114775760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161043b565b6000818152600260205260409020546001600160a01b0316156114dc5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161043b565b6000818152600260205260409020546001600160a01b0316156115415760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161043b565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106115f5577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310611621576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061163f57662386f26fc10000830492506010015b6305f5e1008310611657576305f5e100830492506008015b612710831061166b57612710830492506004015b6064831061167d576064830492506002015b600a83106102ec5760010192915050565b50805461169a90611a0a565b6000825580601f106116aa575050565b601f0160209004906000526020600020908101906105e891905b808211156116d857600081556001016116c4565b5090565b6001600160e01b0319811681146105e857600080fd5b60006020828403121561170457600080fd5b8135611267816116dc565b60005b8381101561172a578181015183820152602001611712565b50506000910152565b6000815180845261174b81602086016020860161170f565b601f01601f19169290920160200192915050565b6020815260006112676020830184611733565b60006020828403121561178457600080fd5b5035919050565b80356001600160a01b03811681146117a257600080fd5b919050565b600080604083850312156117ba57600080fd5b6117c38361178b565b946020939093013593505050565b6000806000606084860312156117e657600080fd5b6117ef8461178b565b92506117fd6020850161178b565b9150604084013590509250925092565b60006020828403121561181f57600080fd5b6112678261178b565b6000806040838503121561183b57600080fd5b6118448361178b565b91506020830135801515811461185957600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561189557611895611864565b604051601f8501601f19908116603f011681019082821181831017156118bd576118bd611864565b816040528093508581528686860111156118d657600080fd5b858560208301376000602087830101525050509392505050565b6000806000806080858703121561190657600080fd5b61190f8561178b565b935061191d6020860161178b565b925060408501359150606085013567ffffffffffffffff81111561194057600080fd5b8501601f8101871361195157600080fd5b6119608782356020840161187a565b91505092959194509250565b60008060006060848603121561198157600080fd5b61198a8461178b565b925060208401359150604084013567ffffffffffffffff8111156119ad57600080fd5b8401601f810186136119be57600080fd5b6119cd8682356020840161187a565b9150509250925092565b600080604083850312156119ea57600080fd5b6119f38361178b565b9150611a016020840161178b565b90509250929050565b600181811c90821680611a1e57607f821691505b602082108103611a3e57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351611a5681846020880161170f565b835190830190611a6a81836020880161170f565b01949350505050565b601f8211156104dc57600081815260208120601f850160051c81016020861015611a9a5750805b601f850160051c820191505b81811015611ab957828155600101611aa6565b505050505050565b815167ffffffffffffffff811115611adb57611adb611864565b611aef81611ae98454611a0a565b84611a73565b602080601f831160018114611b245760008415611b0c5750858301515b600019600386901b1c1916600185901b178555611ab9565b600085815260208120601f198616915b82811015611b5357888601518255948401946001909101908401611b34565b5085821015611b715787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611bb36080830184611733565b9695505050505050565b600060208284031215611bcf57600080fd5b8151611267816116dc56fea26469706673582212207db28247db9caeaea2bc4219fd4ebb1b8781ce8f25cbfd6b2f150f5ac473370464736f6c63430008130033";

type OwlearnCourseResourceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwlearnCourseResourceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OwlearnCourseResource__factory extends ContractFactory {
  constructor(...args: OwlearnCourseResourceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    courseName: PromiseOrValue<string>,
    courseSymbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OwlearnCourseResource> {
    return super.deploy(
      courseName,
      courseSymbol,
      overrides || {}
    ) as Promise<OwlearnCourseResource>;
  }
  override getDeployTransaction(
    courseName: PromiseOrValue<string>,
    courseSymbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      courseName,
      courseSymbol,
      overrides || {}
    );
  }
  override attach(address: string): OwlearnCourseResource {
    return super.attach(address) as OwlearnCourseResource;
  }
  override connect(signer: Signer): OwlearnCourseResource__factory {
    return super.connect(signer) as OwlearnCourseResource__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwlearnCourseResourceInterface {
    return new utils.Interface(_abi) as OwlearnCourseResourceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwlearnCourseResource {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OwlearnCourseResource;
  }
}
