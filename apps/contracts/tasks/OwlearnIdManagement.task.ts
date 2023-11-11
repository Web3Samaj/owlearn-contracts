import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnEducatorBadge, OwlearnId } from "../typechain-types";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { BytesLike } from "ethers";
import fs from "fs/promises";
// import { ethers } from "hardhat";

interface SetBlackListArguements {
  blacklistfile: string;
}

// async function setBlackList(
//   { blacklistfile }: SetBlackListArguements,
//   hre: HardhatRuntimeEnvironment
// ): Promise<void> {
//   const { ethers, network } = hre;
//   const [deployer] = await ethers.getSigners();

//   console.log(`Updating the Black List Root on ${network.name}`);
//   const owlearnIdInstance = (await ethers.getContract(
//     CONTRACT_NAMES.OwlearnId
//   )) as OwlearnId;

//   const root = await prepareMerkleRoot({ addresslistfile: blacklistfile }, hre);

//   const transaction = await owlearnIdInstance.updateBlacklistNameMerkleRoot(
//     root
//   );
//   console.log(`Waiting for transaction to be completed...`);
//   const receipt = await transaction.wait();
//   console.log(
//     `New Owl Domain Name ${domainName}.owl minted to ${deployer.address}`
//   );
// }

async function encodeLeaf(
  address: `0x${string}`,
  hre: HardhatRuntimeEnvironment
) {
  const { ethers, network } = hre;

  const abiCoder = new ethers.utils.AbiCoder();
  const encodedLeaf = abiCoder.encode(["address"], [address]);
  // console.log(encodedLeaf);
  return encodedLeaf;
}

interface MintOwlIdUserArguments {
  name: string;
}

async function mintOwlId(
  { name: domainName }: MintOwlIdUserArguments,
  hre: HardhatRuntimeEnvironment
): Promise<void> {
  const { ethers, network } = hre;
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();

  // generate allowListProof
  const addresslistfile = "allowListInputs.ts";
  const allow_proof = await prepareAllowListMerkleProof(
    { addresslistfile, address },
    hre
  );

  // generate blackListProof
  const blacklistfile = "usernameBlackListInputs.ts";
  const blacklist_proof = await prepareBlackListMerkleProof(
    { blacklistfile, username: domainName },
    hre
  );

  console.log(
    `Minting new Owl ID with domain name ${domainName} on ${network.name}`
  );
  const owlearnIdInstance = (await ethers.getContract(
    CONTRACT_NAMES.OwlearnId
  )) as OwlearnId;
  // fetch domain name price
  const isFeeEnabled = await owlearnIdInstance.isFeeEnabled();

  const domainNamePrice = isFeeEnabled
    ? await owlearnIdInstance.getPrice(domainName, address)
    : 0;

  const transaction = await owlearnIdInstance.registerOwlId(
    domainName,
    allow_proof,
    blacklist_proof,
    {
      value: domainNamePrice,
    }
  );
  console.log(`Waiting for transaction to be completed...`);
  const receipt = await transaction.wait();
  console.log(
    `New Owl Domain Name ${domainName}.owl minted to ${deployer.address}`
  );
}

interface MintRestrictedOwlIdUserArguments {
  name: string;
  address: `0x${string}`;
}

async function mintRestrictedOwlId(
  { name: domainName, address: user }: MintRestrictedOwlIdUserArguments,
  hre: HardhatRuntimeEnvironment
): Promise<void> {
  const { ethers, network } = hre;
  const [deployer] = await ethers.getSigners();
  // const address = await deployer.getAddress();

  // generate allowListProof
  const addresslistfile = "allowListInputs.ts";
  const allow_proof = await prepareAllowListMerkleProof(
    { addresslistfile, address: user },
    hre
  );

  // // generate blackListProof
  // const blacklistfile = "usernameBlackListInputs.ts";
  // const blacklist_proof = await prepareBlackListMerkleProof(
  //   { blacklistfile, username: domainName },
  //   hre
  // );

  console.log(
    `Minting new Owl ID with domain name ${domainName} on ${network.name}`
  );
  const owlearnIdInstance = (await ethers.getContract(
    CONTRACT_NAMES.OwlearnId
  )) as OwlearnId;
  // fetch domain name price
  const isFeeEnabled = await owlearnIdInstance.isFeeEnabled();

  const domainNamePrice = isFeeEnabled
    ? await owlearnIdInstance.getPrice(domainName, user)
    : 0;

  const transaction = await owlearnIdInstance.registerRestrictedNames(
    domainName,
    user,
    allow_proof,
    {
      value: domainNamePrice,
    }
  );
  console.log(`Waiting for transaction to be completed...`);
  const receipt = await transaction.wait();
  console.log(
    `New Owl Domain Name ${domainName}.owl minted to ${deployer.address}`
  );
}

interface PrepareAllowListRootArguments {
  addresslistfile: string;
}

interface AllowListRootInputs {
  allowedAddressList: `0x${string}`[];
}

async function prepareAllowListMerkleRoot(
  { addresslistfile }: PrepareAllowListRootArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string> {
  const { ethers, network } = hre;
  const abiCoder = new ethers.utils.AbiCoder();

  const inputs: AllowListRootInputs = await import(
    "../config/inputs/" + addresslistfile
  );
  const { allowedAddressList: addressList } = inputs;
  // console.log(addressList);

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  await addressList.forEach(async (address) => {
    encodedAddressList.push(await abiCoder.encode(["address"], [address]));
  });

  console.log("Preparing the merkle tree ...");

  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(encodedAddressList, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });

  // compute the root
  const merkleRoot: string = merkleTree.getHexRoot();
  console.log("Merkle Root for the addressAllowList");
  console.log(merkleRoot);

  // console.log(
  //   "Merkle Root is also saved to the file config/outputs/allowListMerkleRoot.js"
  // );
  // await fs.writeFile("../config/outputs/allowListMerkleRoot.js", merkleRoot);

  return merkleRoot;
}

interface PrepareAllowListProofArguments {
  addresslistfile: string;
  address: string;
}

async function prepareAllowListMerkleProof(
  { addresslistfile, address }: PrepareAllowListProofArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string[]> {
  const { ethers, network } = hre;
  const abiCoder = new ethers.utils.AbiCoder();

  const inputs: AllowListRootInputs = await import(
    "../config/inputs/" + addresslistfile
  );

  const { allowedAddressList: addressList } = inputs;

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  await addressList.forEach(async (address) => {
    encodedAddressList.push(await abiCoder.encode(["address"], [address]));
  });

  // console.log(encodedAddressList);

  console.log("Preparing Merkle Tree ....");
  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(encodedAddressList, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });

  console.log("Preparing leaf and MerkleProof");
  const leaf = keccak256(await abiCoder.encode(["address"], [address]));
  const proof: string[] = await merkleTree.getHexProof(leaf);
  console.log(proof);
  return proof;
}

interface VerifyMerkleProofArguments {
  addresslistfile: string;
  prooffile: string;
  address: `0x${string}`;
}

interface MerkleProofInputs {
  proofs: string[];
}

async function verifyMerkleProof(
  { addresslistfile, prooffile, address }: VerifyMerkleProofArguments,
  hre: HardhatRuntimeEnvironment
): Promise<boolean> {
  const { ethers, network } = hre;

  const proofInputs: MerkleProofInputs = await import(
    "../config/outputs/" + prooffile
  );

  const inputs: AllowListRootInputs = await import(
    "../config/inputs/" + addresslistfile
  );

  const { allowedAddressList: addressList } = inputs;

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  await addressList.forEach(async (address) => {
    encodedAddressList.push(await encodeLeaf(address, hre));
  });

  const merkleTree: MerkleTree = new MerkleTree(encodedAddressList, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });
  const root = merkleTree.getHexRoot();

  const { proofs } = proofInputs;

  const leaf = keccak256(await encodeLeaf(address, hre));
  const isVerified = merkleTree.verify(proofs, leaf, root);

  console.log(isVerified);
  return isVerified;
}

interface PrepareBlackListRootArguments {
  blacklistfile: string;
}

interface BlackListRootInputs {
  UserNameBlackList: `0x${string}`[];
}

async function prepareBlackListMerkleRoot(
  { blacklistfile }: PrepareBlackListRootArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string> {
  const { ethers, network } = hre;
  const abiCoder = new ethers.utils.AbiCoder();

  const inputs: BlackListRootInputs = await import(
    "../config/inputs/" + blacklistfile
  );
  const { UserNameBlackList: usernameList } = inputs;
  // console.log(addressList);

  let encodedUsernameList: any[] = [];
  // prepare the encoded list
  await usernameList.forEach(async (username) => {
    encodedUsernameList.push(await abiCoder.encode(["string"], [username]));
  });

  console.log("Preparing the merkle tree ...");

  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(
    encodedUsernameList,
    keccak256,
    {
      hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
      sortPairs: true, // Sort the tree for determinstic output
      sortLeaves: true,
    }
  );

  // compute the root
  const merkleRoot: string = merkleTree.getHexRoot();
  console.log("Merkle Root for the UserName Blacklist");
  console.log(merkleRoot);

  // console.log(
  //   "Merkle Root is also saved to the file config/outputs/blackListMerkleRoot.js"
  // );
  // await fs.writeFile("../config/outputs/blackListMerkleRoot.js", merkleRoot);

  return merkleRoot;
}

interface PrepareBlackListProofArguments {
  blacklistfile: string;
  username: string;
}

async function prepareBlackListMerkleProof(
  { blacklistfile, username }: PrepareBlackListProofArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string[]> {
  const { ethers, network } = hre;
  const abiCoder = new ethers.utils.AbiCoder();

  const inputs: BlackListRootInputs = await import(
    "../config/inputs/" + blacklistfile
  );

  const { UserNameBlackList: usernameList } = inputs;

  let encodedUsernameList: any[] = [];
  // prepare the encoded list
  await usernameList.forEach(async (username) => {
    encodedUsernameList.push(await abiCoder.encode(["string"], [username]));
  });

  // console.log(encodedAddressList);

  console.log("Preparing Merkle Tree ....");
  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(
    encodedUsernameList,
    keccak256,
    {
      hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
      sortPairs: true, // Sort the tree for determinstic output
      sortLeaves: true,
    }
  );

  console.log("Preparing leaf and MerkleProof");
  const leaf = keccak256(await abiCoder.encode(["string"], [username]));
  const proof: string[] = await merkleTree.getHexProof(leaf);
  console.log(proof);
  return proof;
}

task("mintOwlId", "Mint Owl ID")
  .addParam("name", "username for owl ID")
  .setAction(mintOwlId);

task("mintRestrictedOwlId", "Mint Restricted username Owl ID")
  .addParam("name", "username for owl ID")
  .addParam("address", "Address to mint")
  .setAction(mintRestrictedOwlId);

task("prepareAllowListMerkleRoot", "prepare the merkle root")
  .addParam("addresslistfile", "address list input file")
  .setAction(prepareAllowListMerkleRoot);

task("prepareBlackListMerkleRoot", "prepare the merkle root")
  .addParam("blacklistfile", "Username Black list input file")
  .setAction(prepareBlackListMerkleRoot);

task("prepareAllowListMerkleProof", "prepare the merkle proof for verification")
  .addParam("addresslistfile", "address list input file")
  .addParam("address", "address for which the proof is needed")
  .setAction(prepareAllowListMerkleProof);

task("prepareBlackListMerkleProof", "prepare the merkle proof for verification")
  .addParam("blacklistfile", "Username black list input file")
  .addParam("username", "username for which the proof is needed")
  .setAction(prepareBlackListMerkleProof);

task("verifyMerkleProof", "prepare the merkle proof for verification")
  .addParam("addresslistfile", "Merkle Root for the whitelisted address")
  .addParam("prooffile", "Mekrle proof for the address to verify")
  .addParam("address", "address for which the proof is needed")
  .setAction(verifyMerkleProof);
