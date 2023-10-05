import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnEducatorBadge, OwlearnId } from "../typechain-types";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { BytesLike } from "ethers";
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
  addresslistfile: string;
}

async function mintOwlId(
  { name: domainName, addresslistfile }: MintOwlIdUserArguments,
  hre: HardhatRuntimeEnvironment
): Promise<void> {
  const { ethers, network } = hre;
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();

  const allow_proof = await prepareMerkleProof(
    { addresslistfile, address },
    hre
  );
  const blacklist_proof = ["0x", "0x", "0x"];
  console.log(
    `Minting new Owl ID with domain name ${domainName} on ${network.name}`
  );
  const owlearnIdInstance = (await ethers.getContract(
    CONTRACT_NAMES.OwlearnId
  )) as OwlearnId;
  // fetch domain name price
  const domainNamePrice = await owlearnIdInstance.getPrice(domainName, address);
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

interface PrepareMerkleRootArguments {
  addresslistfile: string;
}

interface MerkleRootInputs {
  allowedAddressList: `0x${string}`[];
}

async function prepareMerkleRoot(
  { addresslistfile }: PrepareMerkleRootArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string> {
  const { ethers, network } = hre;

  const inputs: MerkleRootInputs = await import(
    "../config/inputs/" + addresslistfile
  );
  const { allowedAddressList: addressList } = inputs;
  // console.log(addressList);

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  await addressList.forEach(async (address) => {
    encodedAddressList.push(await encodeLeaf(address, hre));
  });

  // console.log(encodedAddressList);

  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(encodedAddressList, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });

  // compute the root
  const merkleRoot: string = merkleTree.getHexRoot();
  console.log(merkleRoot);
  return merkleRoot;
}

interface PrepareMerkleProofArguments {
  addresslistfile: string;
  address: `0x${string}`;
}

async function prepareMerkleProof(
  { addresslistfile, address }: PrepareMerkleProofArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string[]> {
  const { ethers, network } = hre;

  const inputs: MerkleRootInputs = await import(
    "../config/inputs/" + addresslistfile
  );

  const { allowedAddressList: addressList } = inputs;

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  await addressList.forEach(async (address) => {
    encodedAddressList.push(await encodeLeaf(address, hre));
  });

  // console.log(encodedAddressList);

  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(encodedAddressList, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });

  const leaf = keccak256(await encodeLeaf(address, hre));
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

  const inputs: MerkleRootInputs = await import(
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

task("mintOwlId", "Mint Owl ID")
  .addParam("name", "username for owl ID")
  .addParam("addresslistfile", "address list input file")
  .setAction(mintOwlId);

task("prepareMerkleRoot", "prepare the merkle root")
  .addParam("addresslistfile", "address list input file")
  .setAction(prepareMerkleRoot);

task("prepareMerkleProof", "prepare the merkle proof for verification")
  .addParam("addresslistfile", "address list input file")
  .addParam("address", "address for which the proof is needed")
  .setAction(prepareMerkleProof);

task("verifyMerkleProof", "prepare the merkle proof for verification")
  .addParam("addresslistfile", "Merkle Root for the whitelisted address")
  .addParam("prooffile", "Mekrle proof for the address to verify")
  .addParam("address", "address for which the proof is needed")
  .setAction(verifyMerkleProof);
