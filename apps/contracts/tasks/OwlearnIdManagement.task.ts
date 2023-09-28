import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnEducatorBadge, OwlearnId } from "../typechain-types";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { BytesLike } from "ethers";
import { ethers } from "hardhat";

async function encodeLeaf(address: `0x${string}`) {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.encode(["address"], [address]);
}

interface MintOwlIdUserArguments {
  name: string;
  merkleProof: BytesLike[];
}

async function mintOwlId(
  { name: domainName, merkleProof: proof }: MintOwlIdUserArguments,
  hre: HardhatRuntimeEnvironment
): Promise<void> {
  const { ethers, network } = hre;
  const [deployer] = await ethers.getSigners();
  console.log(
    `Minting new Owl ID with domain name ${domainName} on ${network.name}`
  );
  const owlearnIdInstance = (await ethers.getContract(
    CONTRACT_NAMES.OwlearnId
  )) as OwlearnId;
  // fetch domain name price
  const domainNamePrice = await owlearnIdInstance.getPrice(domainName);
  const transaction = await owlearnIdInstance.registerOwlId(domainName, proof, {
    value: domainNamePrice,
  });
  console.log(`Waiting for transaction to be completed...`);
  const receipt = await transaction.wait();
  console.log(
    `New Owl Domain Name ${domainName}.owl minted to ${deployer.address}`
  );
}

interface PrepareMerkleRootArguments {
  addressList: `0x${string}`[];
}

async function prepareMerkleRoot(
  { addressList }: PrepareMerkleRootArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string> {
  const { ethers, network } = hre;

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  addressList.forEach((address) => {
    encodedAddressList.push(encodeLeaf(address));
  });

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
  addressList: `0x${string}`[];
  address: `0x${string}`;
}

async function prepareMerkleProof(
  { addressList, address }: PrepareMerkleProofArguments,
  hre: HardhatRuntimeEnvironment
): Promise<string[]> {
  const { ethers, network } = hre;

  let encodedAddressList: any[] = [];
  // prepare the encoded list
  addressList.forEach(async (address) => {
    await encodedAddressList.push(encodeLeaf(address));
  });

  // prepare the MerkleTree
  const merkleTree: MerkleTree = new MerkleTree(encodedAddressList, keccak256, {
    hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
    sortPairs: true, // Sort the tree for determinstic output
    sortLeaves: true,
  });

  const leaf = await encodeLeaf(address);
  const proof: string[] = merkleTree.getHexProof(leaf);
  console.log(proof);
  return proof;
}

interface VerifyMerkleProofArguments {
  root: string;
  proof: string[];
  address: `0x${string}`;
}

async function verifyMerkleProof(
  { root, proof, address }: VerifyMerkleProofArguments,
  hre: HardhatRuntimeEnvironment
): Promise<boolean> {
  const { ethers, network } = hre;

  const leaf = await encodeLeaf(address);
  const isVerified = MerkleTree.verify(proof, root, leaf);

  console.log(isVerified);
  return isVerified;
}

task("mintOwlId", "Mint Owl ID")
  .addParam("name", "username for owl ID")
  .setAction(mintOwlId);

task("prepareMerkleRoot", "prepare the merkle root")
  .addParam("addressList", "list of the addresses to be whitelisted")
  .setAction(prepareMerkleRoot);

task("prepareMerkleProof", "prepare the merkle proof for verification")
  .addParam("addressList", "list of the addresses whitelisted")
  .addParam("address", "address for which the proof is needed")
  .setAction(prepareMerkleRoot);

task("verifyMerkleProof", "prepare the merkle proof for verification")
  .addParam("root", "Merkle Root for the whitelisted address")
  .addParam("proof", "Mekrle proof for the address to verify")
  .addParam("address", "address for which the proof is needed")
  .setAction(verifyMerkleProof);
