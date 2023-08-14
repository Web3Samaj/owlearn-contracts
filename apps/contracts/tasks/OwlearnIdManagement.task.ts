import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnEducatorBadge, OwlearnId } from "../typechain-types";

interface MintOwlIdUserArguments {
    name: string;
}

async function mintOwlId({name: domainName}: MintOwlIdUserArguments, hre: HardhatRuntimeEnvironment): Promise<void> {
  const { ethers, network } = hre;
  const [deployer] = await ethers.getSigners();
  console.log(`Minting new Owl ID with domain name ${domainName} on ${network.name}`);
  const owlearnIdInstance = await ethers.getContract(CONTRACT_NAMES.OwlearnId) as OwlearnId;
  // fetch domain name price
  const domainNamePrice = await owlearnIdInstance.price(domainName);
  const transaction = await owlearnIdInstance.register(domainName, {value: domainNamePrice});
  console.log(`Waiting for transaction to be completed...`);
  const receipt = await transaction.wait();
  console.log(`New Owl Domain Name ${domainName}.owl minted to ${deployer.address}`);
}

task("mintOwlId", "Mint Owl ID").addParam("name", "username for owl ID").setAction(mintOwlId);