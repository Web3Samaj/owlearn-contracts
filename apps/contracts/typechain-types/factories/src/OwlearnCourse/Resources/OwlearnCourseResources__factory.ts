/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OwlearnCourseResources,
  OwlearnCourseResourcesInterface,
} from "../../../../src/OwlearnCourse/Resources/OwlearnCourseResources";

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
      {
        internalType: "address",
        name: "courseCreator",
        type: "address",
      },
      {
        internalType: "string",
        name: "courseURI",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "courseNFTURIs",
        type: "string[]",
      },
      {
        internalType: "address",
        name: "courseAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
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
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
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
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "courseName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "courseSymbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "CourseInitialised",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "CourseResourceBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newResourceURI",
        type: "string",
      },
    ],
    name: "CourseResourceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "totalResourceMinted",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "courseURIs",
        type: "string[]",
      },
    ],
    name: "NewCourseResourceMinted",
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
    stateMutability: "payable",
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
    inputs: [],
    name: "baseURI",
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
    name: "courseDetailsURI",
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
    name: "deleteCourseNFT",
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
      {
        internalType: "string",
        name: "newNFTURI",
        type: "string",
      },
    ],
    name: "editCourseNFT",
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
    inputs: [
      {
        internalType: "string[]",
        name: "courseNFTURIs",
        type: "string[]",
      },
    ],
    name: "mintCourseNFTs",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "payable",
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
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setBaseURI",
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
    inputs: [],
    name: "totalSupply",
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
    stateMutability: "payable",
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
  "0x60a060405260006080908152600c906200001a90826200054a565b503480156200002857600080fd5b506040516200268d3803806200268d8339810160408190526200004b91620007aa565b858560026200005b83826200054a565b5060036200006a82826200054a565b505060008055506200007c3362000106565b620000878462000158565b60096200009584826200054a565b50620000a182620001db565b600a80546001600160a01b0319166001600160a01b0383161790556040517f55cb48b486025ffa5b3865fbcd0f920dfdbcb9da4d11015eddbc3a27158b28db90620000f290889088908890620008b5565b60405180910390a1505050505050620009be565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b62000162620001e7565b6001600160a01b038116620001cd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b620001d88162000106565b50565b620001d8338262000245565b6008546001600160a01b03163314620002435760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401620001c4565b565b8051620002538382620002e3565b60005b81811015620002a2576200028d81848381518110620002795762000279620008f7565b6020026020010151620003c860201b60201c565b8062000299816200090d565b91505062000256565b507fc94fd08ef2f4f81479b90d2a7fc5eec80cf60e55e6af914ca21ae0926d32e07d8183604051620002d692919062000935565b60405180910390a1505050565b6000805490829003620003095760405163b562e8dd60e01b815260040160405180910390fd5b6001600160a01b03831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083906000805160206200266d8339815191528180a4600183015b8181146200039857808360006000805160206200266d833981519152600080a46001016200036f565b5081600003620003ba57604051622e076360e81b815260040160405180910390fd5b60005550505050565b505050565b620003d3826200047b565b620004215760405162461bcd60e51b815260206004820152601c60248201527f55524920736574206f66206e6f6e6578697374656e7420746f6b656e000000006044820152606401620001c4565b6000828152600b602052604090206200043b82826200054a565b507fa7527b31563240d0f5f29d80c2f13916d38a7b2b19b892c43486ed47722f2ffb82826040516200046f929190620009a3565b60405180910390a15050565b6000805482108015620004a05750600082815260046020526040902054600160e01b16155b92915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620004d157607f821691505b602082108103620004f257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003c357600081815260208120601f850160051c81016020861015620005215750805b601f850160051c820191505b8181101562000542578281556001016200052d565b505050505050565b81516001600160401b03811115620005665762000566620004a6565b6200057e81620005778454620004bc565b84620004f8565b602080601f831160018114620005b657600084156200059d5750858301515b600019600386901b1c1916600185901b17855562000542565b600085815260208120601f198616915b82811015620005e757888601518255948401946001909101908401620005c6565b5085821015620006065787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b604051601f8201601f191681016001600160401b0381118282101715620006415762000641620004a6565b604052919050565b60005b83811015620006665781810151838201526020016200064c565b50506000910152565b600082601f8301126200068157600080fd5b81516001600160401b038111156200069d576200069d620004a6565b620006b2601f8201601f191660200162000616565b818152846020838601011115620006c857600080fd5b620006db82602083016020870162000649565b949350505050565b80516001600160a01b0381168114620006fb57600080fd5b919050565b600082601f8301126200071257600080fd5b815160206001600160401b0380831115620007315762000731620004a6565b8260051b6200074283820162000616565b93845285810183019383810190888611156200075d57600080fd5b84880192505b858310156200079e578251848111156200077d5760008081fd5b6200078d8a87838c01016200066f565b835250918401919084019062000763565b98975050505050505050565b60008060008060008060c08789031215620007c457600080fd5b86516001600160401b0380821115620007dc57600080fd5b620007ea8a838b016200066f565b975060208901519150808211156200080157600080fd5b6200080f8a838b016200066f565b96506200081f60408a01620006e3565b955060608901519150808211156200083657600080fd5b620008448a838b016200066f565b945060808901519150808211156200085b57600080fd5b506200086a89828a0162000700565b9250506200087b60a08801620006e3565b90509295509295509295565b60008151808452620008a181602086016020860162000649565b601f01601f19169290920160200192915050565b606081526000620008ca606083018662000887565b8281036020840152620008de818662000887565b91505060018060a01b0383166040830152949350505050565b634e487b7160e01b600052603260045260246000fd5b6000600182016200092e57634e487b7160e01b600052601160045260246000fd5b5060010190565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b828110156200099557605f198887030184526200098286835162000887565b9550928401929084019060010162000963565b509398975050505050505050565b828152604060208201526000620006db604083018462000887565b611c9f80620009ce6000396000f3fe60806040526004361061018b5760003560e01c8063715018a6116100d6578063beefab371161007f578063f2f853ea11610059578063f2f853ea1461042b578063f2fde38b1461044b578063fc6c9bb21461046b57600080fd5b8063beefab37146103a2578063c87b56dd146103c2578063e985e9c5146103e257600080fd5b8063a22cb465116100b0578063a22cb4651461034f578063ad79f6221461036f578063b88d4fde1461038f57600080fd5b8063715018a6146103075780638da5cb5b1461031c57806395d89b411461033a57600080fd5b806323b872dd116101385780636352211e116101125780636352211e146102b25780636c0360eb146102d257806370a08231146102e757600080fd5b806323b872dd1461026c57806342842e0e1461027f57806355f804b31461029257600080fd5b8063095ea7b311610169578063095ea7b31461021f5780631238dae01461023457806318160ddd1461024957600080fd5b806301ffc9a71461019057806306fdde03146101c5578063081812fc146101e7575b600080fd5b34801561019c57600080fd5b506101b06101ab3660046115c2565b61048b565b60405190151581526020015b60405180910390f35b3480156101d157600080fd5b506101da610528565b6040516101bc919061162f565b3480156101f357600080fd5b50610207610202366004611642565b6105ba565b6040516001600160a01b0390911681526020016101bc565b61023261022d366004611677565b610617565b005b34801561024057600080fd5b506101da6106dd565b34801561025557600080fd5b50600154600054035b6040519081526020016101bc565b61023261027a3660046116a1565b61076b565b61023261028d3660046116a1565b610941565b34801561029e57600080fd5b506102326102ad36600461179c565b610961565b3480156102be57600080fd5b506102076102cd366004611642565b610979565b3480156102de57600080fd5b506101da610984565b3480156102f357600080fd5b5061025e6103023660046117d1565b610991565b34801561031357600080fd5b506102326109f9565b34801561032857600080fd5b506008546001600160a01b0316610207565b34801561034657600080fd5b506101da610a0d565b34801561035b57600080fd5b5061023261036a3660046117ec565b610a1c565b34801561037b57600080fd5b5061023261038a366004611828565b610a88565b61023261039d3660046118eb565b610b05565b3480156103ae57600080fd5b50600a54610207906001600160a01b031681565b3480156103ce57600080fd5b506101da6103dd366004611642565b610b4f565b3480156103ee57600080fd5b506101b06103fd366004611967565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561043757600080fd5b5061023261044636600461199a565b610c6f565b34801561045757600080fd5b506102326104663660046117d1565b610d10565b34801561047757600080fd5b50610232610486366004611642565b610d9d565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0319831614806104ee57507f80ac58cd000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b8061052257507f5b5e139f000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b606060028054610537906119e1565b80601f0160208091040260200160405190810160405280929190818152602001828054610563906119e1565b80156105b05780601f10610585576101008083540402835291602001916105b0565b820191906000526020600020905b81548152906001019060200180831161059357829003601f168201915b5050505050905090565b60006105c582610e36565b6105fb576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061062282610979565b9050336001600160a01b038216146106745761063e81336103fd565b610674576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600980546106ea906119e1565b80601f0160208091040260200160405190810160405280929190818152602001828054610716906119e1565b80156107635780601f1061073857610100808354040283529160200191610763565b820191906000526020600020905b81548152906001019060200180831161074657829003601f168201915b505050505081565b600061077682610e5d565b9050836001600160a01b0316816001600160a01b0316146107c3576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080546107ef8187335b6001600160a01b039081169116811491141790565b61081a576107fd86336103fd565b61081a57604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b03851661085a576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561086557600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040812091909155600160e11b841690036108f7576001840160008181526004602052604081205490036108f55760005481146108f55760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45b505050505050565b61095c83838360405180602001604052806000815250610b05565b505050565b610969610ee4565b600c6109758282611a61565b5050565b600061052282610e5d565b600c80546106ea906119e1565b60006001600160a01b0382166109d3576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b610a01610ee4565b610a0b6000610f3e565b565b606060038054610537906119e1565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b600a546001600160a01b03163314610ae75760405162461bcd60e51b815260206004820152601460248201527f4f4e4c5920434f5552534520434f4e545241435400000000000000000000000060448201526064015b60405180910390fd5b610b02610afc6008546001600160a01b031690565b82610f9d565b50565b610b1084848461076b565b6001600160a01b0383163b15610b4957610b2c84848484611028565b610b49576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b6060610b5a82610e36565b610b7757604051630a14c4b560e41b815260040160405180910390fd5b6000828152600b602052604081208054610b90906119e1565b80601f0160208091040260200160405190810160405280929190818152602001828054610bbc906119e1565b8015610c095780601f10610bde57610100808354040283529160200191610c09565b820191906000526020600020905b815481529060010190602001808311610bec57829003601f168201915b505050505090506000610c1a611113565b90508051600003610c2c575092915050565b815115610c5e578082604051602001610c46929190611b21565b60405160208183030381529060405292505050919050565b610c6784611122565b949350505050565b600a546001600160a01b03163314610cc95760405162461bcd60e51b815260206004820152601460248201527f4f4e4c5920434f5552534520434f4e54524143540000000000000000000000006044820152606401610ade565b610cd382826111a5565b7f67a3db4523b2423e9fe7cdb644223ab1cec0d37edb427efb397f2d19a91e0e818282604051610d04929190611b50565b60405180910390a15050565b610d18610ee4565b6001600160a01b038116610d945760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610ade565b610b0281610f3e565b600a546001600160a01b03163314610df75760405162461bcd60e51b815260206004820152601460248201527f4f4e4c5920434f5552534520434f4e54524143540000000000000000000000006044820152606401610ade565b610e0081611244565b6040518181527fa8f4726b0aea98608e86d6ce481cc6256cdc01bfab9f5e9dfee21fd6fc25ba7e9060200160405180910390a150565b6000805482108015610522575050600090815260046020526040902054600160e01b161590565b600081600054811015610eb25760008181526004602052604081205490600160e01b82169003610eb0575b80600003610ea9575060001901600081815260046020526040902054610e88565b9392505050565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6008546001600160a01b03163314610a0b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610ade565b600880546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b8051610fa98382611286565b60005b81811015610fe957610fd781848381518110610fca57610fca611b69565b60200260200101516111a5565b80610fe181611b7f565b915050610fac565b507fc94fd08ef2f4f81479b90d2a7fc5eec80cf60e55e6af914ca21ae0926d32e07d818360405161101b929190611ba6565b60405180910390a1505050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a029061105d903390899088908890600401611c10565b6020604051808303816000875af1925050508015611098575060408051601f3d908101601f1916820190925261109591810190611c4c565b60015b6110f6573d8080156110c6576040519150601f19603f3d011682016040523d82523d6000602084013e6110cb565b606091505b5080516000036110ee576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b6060600c8054610537906119e1565b606061112d82610e36565b61114a57604051630a14c4b560e41b815260040160405180910390fd5b6000611154611113565b905080516000036111745760405180602001604052806000815250610ea9565b8061117e846113b7565b60405160200161118f929190611b21565b6040516020818303038152906040529392505050565b6111ae82610e36565b6111fa5760405162461bcd60e51b815260206004820152601c60248201527f55524920736574206f66206e6f6e6578697374656e7420746f6b656e000000006044820152606401610ade565b6000828152600b602052604090206112128282611a61565b507fa7527b31563240d0f5f29d80c2f13916d38a7b2b19b892c43486ed47722f2ffb8282604051610d04929190611b50565b61124f8160016113fb565b6000818152600b602052604090208054611268906119e1565b159050610b02576000818152600b60205260408120610b029161155e565b60008054908290036112c4576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b81811461137357808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a460010161133b565b50816000036113ae576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a9004806113d15750819003601f19909101908152919050565b600061140683610e5d565b90508060008061142486600090815260066020526040902080549091565b915091508415611464576114398184336107da565b6114645761144783336103fd565b61146457604051632ce44b5f60e11b815260040160405180910390fd5b801561146f57600082555b6001600160a01b038316600081815260056020526040902080546fffffffffffffffffffffffffffffffff0190554260a01b177c030000000000000000000000000000000000000000000000000000000017600087815260046020526040812091909155600160e11b85169003611516576001860160008181526004602052604081205490036115145760005481146115145760008181526004602052604090208590555b505b60405186906000906001600160a01b038616907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050600180548101905550505050565b50805461156a906119e1565b6000825580601f1061157a575050565b601f016020900490600052602060002090810190610b0291905b808211156115a85760008155600101611594565b5090565b6001600160e01b031981168114610b0257600080fd5b6000602082840312156115d457600080fd5b8135610ea9816115ac565b60005b838110156115fa5781810151838201526020016115e2565b50506000910152565b6000815180845261161b8160208601602086016115df565b601f01601f19169290920160200192915050565b602081526000610ea96020830184611603565b60006020828403121561165457600080fd5b5035919050565b80356001600160a01b038116811461167257600080fd5b919050565b6000806040838503121561168a57600080fd5b6116938361165b565b946020939093013593505050565b6000806000606084860312156116b657600080fd5b6116bf8461165b565b92506116cd6020850161165b565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561171c5761171c6116dd565b604052919050565b600067ffffffffffffffff83111561173e5761173e6116dd565b611751601f8401601f19166020016116f3565b905082815283838301111561176557600080fd5b828260208301376000602084830101529392505050565b600082601f83011261178d57600080fd5b610ea983833560208501611724565b6000602082840312156117ae57600080fd5b813567ffffffffffffffff8111156117c557600080fd5b610c678482850161177c565b6000602082840312156117e357600080fd5b610ea98261165b565b600080604083850312156117ff57600080fd5b6118088361165b565b91506020830135801515811461181d57600080fd5b809150509250929050565b6000602080838503121561183b57600080fd5b823567ffffffffffffffff8082111561185357600080fd5b818501915085601f83011261186757600080fd5b813581811115611879576118796116dd565b8060051b6118888582016116f3565b91825283810185019185810190898411156118a257600080fd5b86860192505b838310156118de578235858111156118c05760008081fd5b6118ce8b89838a010161177c565b83525091860191908601906118a8565b9998505050505050505050565b6000806000806080858703121561190157600080fd5b61190a8561165b565b93506119186020860161165b565b925060408501359150606085013567ffffffffffffffff81111561193b57600080fd5b8501601f8101871361194c57600080fd5b61195b87823560208401611724565b91505092959194509250565b6000806040838503121561197a57600080fd5b6119838361165b565b91506119916020840161165b565b90509250929050565b600080604083850312156119ad57600080fd5b82359150602083013567ffffffffffffffff8111156119cb57600080fd5b6119d78582860161177c565b9150509250929050565b600181811c908216806119f557607f821691505b602082108103611a1557634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561095c57600081815260208120601f850160051c81016020861015611a425750805b601f850160051c820191505b8181101561093957828155600101611a4e565b815167ffffffffffffffff811115611a7b57611a7b6116dd565b611a8f81611a8984546119e1565b84611a1b565b602080601f831160018114611ac45760008415611aac5750858301515b600019600386901b1c1916600185901b178555610939565b600085815260208120601f198616915b82811015611af357888601518255948401946001909101908401611ad4565b5085821015611b115787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008351611b338184602088016115df565b835190830190611b478183602088016115df565b01949350505050565b828152604060208201526000610c676040830184611603565b634e487b7160e01b600052603260045260246000fd5b600060018201611b9f57634e487b7160e01b600052601160045260246000fd5b5060010190565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b82811015611c0257605f19888703018452611bf0868351611603565b95509284019290840190600101611bd4565b509398975050505050505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611c426080830184611603565b9695505050505050565b600060208284031215611c5e57600080fd5b8151610ea9816115ac56fea264697066735822122060d28dae9e7caf57d47a1cb954fa7278dd914933d60f5cdfc1457741ed5bff3d64736f6c63430008130033ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

type OwlearnCourseResourcesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwlearnCourseResourcesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OwlearnCourseResources__factory extends ContractFactory {
  constructor(...args: OwlearnCourseResourcesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    courseName: PromiseOrValue<string>,
    courseSymbol: PromiseOrValue<string>,
    courseCreator: PromiseOrValue<string>,
    courseURI: PromiseOrValue<string>,
    courseNFTURIs: PromiseOrValue<string>[],
    courseAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OwlearnCourseResources> {
    return super.deploy(
      courseName,
      courseSymbol,
      courseCreator,
      courseURI,
      courseNFTURIs,
      courseAddress,
      overrides || {}
    ) as Promise<OwlearnCourseResources>;
  }
  override getDeployTransaction(
    courseName: PromiseOrValue<string>,
    courseSymbol: PromiseOrValue<string>,
    courseCreator: PromiseOrValue<string>,
    courseURI: PromiseOrValue<string>,
    courseNFTURIs: PromiseOrValue<string>[],
    courseAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      courseName,
      courseSymbol,
      courseCreator,
      courseURI,
      courseNFTURIs,
      courseAddress,
      overrides || {}
    );
  }
  override attach(address: string): OwlearnCourseResources {
    return super.attach(address) as OwlearnCourseResources;
  }
  override connect(signer: Signer): OwlearnCourseResources__factory {
    return super.connect(signer) as OwlearnCourseResources__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwlearnCourseResourcesInterface {
    return new utils.Interface(_abi) as OwlearnCourseResourcesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwlearnCourseResources {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OwlearnCourseResources;
  }
}
