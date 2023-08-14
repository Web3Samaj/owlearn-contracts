/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  OwlearnCourse,
  OwlearnCourseInterface,
} from "../../../src/OwlearnCourse/OwlearnCourse";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "courseCertificates",
    outputs: [
      {
        internalType: "contract OwlearnCourseCertificates",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "courseId",
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
    name: "courseResources",
    outputs: [
      {
        internalType: "contract OwlearnCourseResources",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creatorId",
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
        name: "_creatorId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_courseId",
        type: "uint256",
      },
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
        internalType: "string",
        name: "certificateBaseURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "_resourceImplementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "_certificateImplementation",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
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
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintCourseCertificate",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "mintModule",
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
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "_mintModule",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "setAndInitialiseMintModule",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805161274f61011860003960008181610373015281816103fe015281816104fb015281816105820152610673015261274f6000f3fe608060405260043610620001245760003560e01c80639374e8b311620000b2578063dbd3abde116200007d578063f2f853ea1162000060578063f2f853ea14620002fa578063f2fde38b146200031f578063fc6c9bb2146200034457600080fd5b8063dbd3abde14620002c0578063e58324ea14620002e257600080fd5b80639374e8b31462000232578063ad79f6221462000254578063ba7366171462000279578063bf0e68d6146200029b57600080fd5b80636e0f634b11620000f35780636e0f634b14620001a9578063715018a614620001c15780638d2576ad14620001d95780638da5cb5b14620001fe57600080fd5b80633659cfe614620001295780634f1ef286146200015057806352d1902d146200016757806365aded471462000192575b600080fd5b3480156200013657600080fd5b506200014e620001483660046200153b565b62000369565b005b6200014e620001613660046200161a565b620004f1565b3480156200017457600080fd5b506200017f62000666565b6040519081526020015b60405180910390f35b6200014e620001a336600462001751565b6200072d565b348015620001b657600080fd5b506200017f60695481565b348015620001ce57600080fd5b506200014e62000a5e565b348015620001e657600080fd5b506200014e620001f836600462001880565b62000a76565b3480156200020b57600080fd5b506033546001600160a01b03165b6040516001600160a01b03909116815260200162000189565b3480156200023f57600080fd5b5060665462000219906001600160a01b031681565b3480156200026157600080fd5b506200014e620002733660046200190a565b62000b2a565b3480156200028657600080fd5b5060655462000219906001600160a01b031681565b348015620002a857600080fd5b506200014e620002ba36600462001880565b62000bb6565b348015620002cd57600080fd5b5060675462000219906001600160a01b031681565b348015620002ef57600080fd5b506200017f60685481565b3480156200030757600080fd5b506200014e6200031936600462001943565b62000d8a565b3480156200032c57600080fd5b506200014e6200033e3660046200153b565b62000e19565b3480156200035157600080fd5b506200014e6200036336600462001984565b62000eac565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003620003fc5760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b19195b1959d85d1958d85b1b60a21b60648201526084015b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620004587f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b031614620004c55760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b6163746976652070726f787960a01b6064820152608401620003f3565b620004d08162000f01565b60408051600080825260208201909252620004ee9183919062000f0b565b50565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003620005805760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b19195b1959d85d1958d85b1b60a21b6064820152608401620003f3565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620005dc7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b031614620006495760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b6163746976652070726f787960a01b6064820152608401620003f3565b620006548262000f01565b620006628282600162000f0b565b5050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614620007085760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401620003f3565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b600054610100900460ff16158080156200074e5750600054600160ff909116105b806200076a5750303b1580156200076a575060005460ff166001145b620007de5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401620003f3565b6000805460ff19166001179055801562000802576000805461ff0019166101001790555b6200080c620010bc565b620008178762001133565b60688b905560698a90556040516000907fded8dcd2000000000000000000000000000000000000000000000000000000009062000863908c908c908c908c908c90309060240162001a4b565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b03838183161783525050505090508381604051620008a89062001502565b620008b592919062001ac7565b604051809103906000f080158015620008d2573d6000803e3d6000fd5b506066805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039290921691909117905560405160009062000916908c9060200162001aeb565b604051602081830303815290604052905060008a6040516020016200093c919062001b32565b60405160208183030381529060405290506000635c6d8da160e01b83838a8e60405160240162000970949392919062001b79565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b03838183161783525050505090508581604051620009b59062001510565b620009c292919062001ac7565b604051809103906000f080158015620009df573d6000803e3d6000fd5b50606560006101000a8154816001600160a01b0302191690836001600160a01b0316021790555050505050801562000a51576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050505050505050565b62000a6862001192565b62000a74600062001133565b565b62000a8062001192565b6067805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0385169081179091556068546069546040517fbe2213c500000000000000000000000000000000000000000000000000000000815263be2213c59262000af19290918790879060040162001bfc565b600060405180830381600087803b15801562000b0c57600080fd5b505af115801562000b21573d6000803e3d6000fd5b50505050505050565b62000b3462001192565b6066546040517fad79f6220000000000000000000000000000000000000000000000000000000081526001600160a01b039091169063ad79f6229062000b7f90849060040162001c1e565b600060405180830381600087803b15801562000b9a57600080fd5b505af115801562000baf573d6000803e3d6000fd5b5050505050565b6067546001600160a01b03161562000c54576067546068546069546040517f3240257f0000000000000000000000000000000000000000000000000000000081526001600160a01b0390931692633240257f9262000c1f92909188908890889060040162001c33565b600060405180830381600087803b15801562000c3a57600080fd5b505af115801562000c4f573d6000803e3d6000fd5b505050505b6065546040517f40d097c30000000000000000000000000000000000000000000000000000000081526001600160a01b03858116600483015260009216906340d097c3906024016020604051808303816000875af115801562000cbb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000ce1919062001c6f565b6067549091506001600160a01b03161562000d84576067546068546069546040517faeaa08330000000000000000000000000000000000000000000000000000000081526001600160a01b039093169263aeaa08339262000d4f929091899087908a908a9060040162001c89565b600060405180830381600087803b15801562000d6a57600080fd5b505af115801562000d7f573d6000803e3d6000fd5b505050505b50505050565b62000d9462001192565b6066546040517ff2f853ea0000000000000000000000000000000000000000000000000000000081526001600160a01b039091169063f2f853ea9062000de1908590859060040162001cc0565b600060405180830381600087803b15801562000dfc57600080fd5b505af115801562000e11573d6000803e3d6000fd5b505050505050565b62000e2362001192565b6001600160a01b03811662000ea15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401620003f3565b620004ee8162001133565b62000eb662001192565b6066546040517ffc6c9bb2000000000000000000000000000000000000000000000000000000008152600481018390526001600160a01b039091169063fc6c9bb29060240162000b7f565b620004ee62001192565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161562000f465762000f4183620011ee565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801562000fa3575060408051601f3d908101601f1916820190925262000fa09181019062001c6f565b60015b620010175760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608401620003f3565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8114620010ae5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152608401620003f3565b5062000f41838383620012bb565b600054610100900460ff16620011295760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401620003f3565b62000a74620012e6565b603380546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6033546001600160a01b0316331462000a745760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401620003f3565b6001600160a01b0381163b6200126d5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152608401620003f3565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b620012c6836200135e565b600082511180620012d45750805b1562000f415762000d848383620013a0565b600054610100900460ff16620013535760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401620003f3565b62000a743362001133565b6200136981620011ee565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060620013c88383604051806060016040528060278152602001620026f360279139620013cf565b9392505050565b6060600080856001600160a01b031685604051620013ee919062001cdb565b600060405180830381855af49150503d80600081146200142b576040519150601f19603f3d011682016040523d82523d6000602084013e62001430565b606091505b509150915062001443868383876200144d565b9695505050505050565b60608315620014c1578251600003620014b9576001600160a01b0385163b620014b95760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401620003f3565b5081620014cd565b620014cd8383620014d5565b949350505050565b815115620014e65781518083602001fd5b8060405162461bcd60e51b8152600401620003f3919062001cf9565b6104f28062001d0f83390190565b6104f2806200220183390190565b80356001600160a01b03811681146200153657600080fd5b919050565b6000602082840312156200154e57600080fd5b620013c8826200151e565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715620015b457620015b462001559565b604052919050565b600067ffffffffffffffff831115620015d957620015d962001559565b620015ee601f8401601f191660200162001588565b90508281528383830111156200160357600080fd5b828260208301376000602084830101529392505050565b600080604083850312156200162e57600080fd5b62001639836200151e565b9150602083013567ffffffffffffffff8111156200165657600080fd5b8301601f810185136200166857600080fd5b6200167985823560208401620015bc565b9150509250929050565b600082601f8301126200169557600080fd5b620013c883833560208501620015bc565b600082601f830112620016b857600080fd5b8135602067ffffffffffffffff80831115620016d857620016d862001559565b8260051b620016e983820162001588565b93845285810183019383810190888611156200170457600080fd5b84880192505b858310156200174557823584811115620017245760008081fd5b620017348a87838c010162001683565b83525091840191908401906200170a565b98975050505050505050565b6000806000806000806000806000806101408b8d0312156200177257600080fd5b8a35995060208b0135985060408b013567ffffffffffffffff808211156200179957600080fd5b620017a78e838f0162001683565b995060608d0135915080821115620017be57600080fd5b620017cc8e838f0162001683565b9850620017dc60808e016200151e565b975060a08d0135915080821115620017f357600080fd5b620018018e838f0162001683565b965060c08d01359150808211156200181857600080fd5b620018268e838f01620016a6565b955060e08d01359150808211156200183d57600080fd5b506200184c8d828e0162001683565b9350506200185e6101008c016200151e565b91506200186f6101208c016200151e565b90509295989b9194979a5092959850565b6000806000604084860312156200189657600080fd5b620018a1846200151e565b9250602084013567ffffffffffffffff80821115620018bf57600080fd5b818601915086601f830112620018d457600080fd5b813581811115620018e457600080fd5b876020828501011115620018f757600080fd5b6020830194508093505050509250925092565b6000602082840312156200191d57600080fd5b813567ffffffffffffffff8111156200193557600080fd5b620014cd84828501620016a6565b600080604083850312156200195757600080fd5b82359150602083013567ffffffffffffffff8111156200197657600080fd5b620016798582860162001683565b6000602082840312156200199757600080fd5b5035919050565b60005b83811015620019bb578181015183820152602001620019a1565b50506000910152565b60008151808452620019de8160208601602086016200199e565b601f01601f19169290920160200192915050565b600081518084526020808501808196508360051b8101915082860160005b8581101562001a3e57828403895262001a2b848351620019c4565b9885019893509084019060010162001a10565b5091979650505050505050565b60c08152600062001a6060c0830189620019c4565b828103602084015262001a748189620019c4565b90506001600160a01b038088166040850152838203606085015262001a9a8288620019c4565b9150838203608085015262001ab08287620019f2565b925080851660a08501525050979650505050505050565b6001600160a01b0383168152604060208201526000620014cd6040830184620019c4565b7f436572746966696361746520426164676520666f72200000000000000000000081526000825162001b258160168501602087016200199e565b9190910160160192915050565b7f43425f000000000000000000000000000000000000000000000000000000000081526000825162001b6c8160038501602087016200199e565b9190910160030192915050565b60808152600062001b8e6080830187620019c4565b828103602084015262001ba28187620019c4565b9050828103604084015262001bb88186620019c4565b9150506001600160a01b038316606083015295945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b8481528360208201526060604082015260006200144360608301848662001bd3565b602081526000620013c86020830184620019f2565b8581528460208201526001600160a01b038416604082015260806060820152600062001c6460808301848662001bd3565b979650505050505050565b60006020828403121562001c8257600080fd5b5051919050565b8681528560208201526001600160a01b038516604082015283606082015260a0608082015260006200174560a08301848662001bd3565b828152604060208201526000620014cd6040830184620019c4565b6000825162001cef8184602087016200199e565b9190910192915050565b602081526000620013c86020830184620019c456fe60806040526040516104f23803806104f2833981016040819052610022916102e2565b818161003082826000610039565b505050506103ff565b61004283610065565b60008251118061004f5750805b156100605761005e83836100a5565b505b505050565b61006e816100d1565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100ca83836040518060600160405280602781526020016104cb60279139610184565b9392505050565b6001600160a01b0381163b6101435760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080856001600160a01b0316856040516101a191906103b0565b600060405180830381855af49150503d80600081146101dc576040519150601f19603f3d011682016040523d82523d6000602084013e6101e1565b606091505b5090925090506101f3868383876101fd565b9695505050505050565b6060831561026c578251600003610265576001600160a01b0385163b6102655760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161013a565b5081610276565b610276838361027e565b949350505050565b81511561028e5781518083602001fd5b8060405162461bcd60e51b815260040161013a91906103cc565b634e487b7160e01b600052604160045260246000fd5b60005b838110156102d95781810151838201526020016102c1565b50506000910152565b600080604083850312156102f557600080fd5b82516001600160a01b038116811461030c57600080fd5b60208401519092506001600160401b038082111561032957600080fd5b818501915085601f83011261033d57600080fd5b81518181111561034f5761034f6102a8565b604051601f8201601f19908116603f01168101908382118183101715610377576103776102a8565b8160405282815288602084870101111561039057600080fd5b6103a18360208301602088016102be565b80955050505050509250929050565b600082516103c28184602087016102be565b9190910192915050565b60208152600082518060208401526103eb8160408501602087016102be565b601f01601f19169190910160400192915050565b60be8061040d6000396000f3fe608060405236601057600e6013565b005b600e5b601f601b6021565b6065565b565b600060607f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e8080156083573d6000f35b3d6000fdfea26469706673582212204d9e4b8e7ae99bf1a8684652233641026ccae9efec942a0a2863c3b2ba6cadb364736f6c63430008130033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656460806040526040516104f23803806104f2833981016040819052610022916102e2565b818161003082826000610039565b505050506103ff565b61004283610065565b60008251118061004f5750805b156100605761005e83836100a5565b505b505050565b61006e816100d1565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100ca83836040518060600160405280602781526020016104cb60279139610184565b9392505050565b6001600160a01b0381163b6101435760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080856001600160a01b0316856040516101a191906103b0565b600060405180830381855af49150503d80600081146101dc576040519150601f19603f3d011682016040523d82523d6000602084013e6101e1565b606091505b5090925090506101f3868383876101fd565b9695505050505050565b6060831561026c578251600003610265576001600160a01b0385163b6102655760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161013a565b5081610276565b610276838361027e565b949350505050565b81511561028e5781518083602001fd5b8060405162461bcd60e51b815260040161013a91906103cc565b634e487b7160e01b600052604160045260246000fd5b60005b838110156102d95781810151838201526020016102c1565b50506000910152565b600080604083850312156102f557600080fd5b82516001600160a01b038116811461030c57600080fd5b60208401519092506001600160401b038082111561032957600080fd5b818501915085601f83011261033d57600080fd5b81518181111561034f5761034f6102a8565b604051601f8201601f19908116603f01168101908382118183101715610377576103776102a8565b8160405282815288602084870101111561039057600080fd5b6103a18360208301602088016102be565b80955050505050509250929050565b600082516103c28184602087016102be565b9190910192915050565b60208152600082518060208401526103eb8160408501602087016102be565b601f01601f19169190910160400192915050565b60be8061040d6000396000f3fe608060405236601057600e6013565b005b600e5b601f601b6021565b6065565b565b600060607f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e8080156083573d6000f35b3d6000fdfea264697066735822122096a65cfbb104ab3c778ebd0ca300961b92d790e9cb9627733e21114cb7cfbf7364736f6c63430008130033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220944c25c31479b63d426adf2e16613e4063cef430f1742c5664b153fd088697b464736f6c63430008130033";

type OwlearnCourseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwlearnCourseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OwlearnCourse__factory extends ContractFactory {
  constructor(...args: OwlearnCourseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OwlearnCourse> {
    return super.deploy(overrides || {}) as Promise<OwlearnCourse>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OwlearnCourse {
    return super.attach(address) as OwlearnCourse;
  }
  override connect(signer: Signer): OwlearnCourse__factory {
    return super.connect(signer) as OwlearnCourse__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwlearnCourseInterface {
    return new utils.Interface(_abi) as OwlearnCourseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwlearnCourse {
    return new Contract(address, _abi, signerOrProvider) as OwlearnCourse;
  }
}
