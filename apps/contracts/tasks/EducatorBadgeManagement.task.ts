import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnEducatorBadge } from "../typechain-types";

interface GiveBadgeUserArguments {
    receiver: string;
    badge: number;
}

async function giveBadge({receiver: receiverAddress, badge: badgeId}: GiveBadgeUserArguments, hre: HardhatRuntimeEnvironment): Promise<void> {
  const { ethers, network } = hre;

  const educatorBadgeInstance = await ethers.getContract(CONTRACT_NAMES.OwlearnEducatorBadge) as OwlearnEducatorBadge;
  console.log(`Minting Educator Badge ID ${badgeId} to ${receiverAddress}...`);
  const transaction = await educatorBadgeInstance.mintEducatorBadges(receiverAddress, badgeId);
  console.log(`Waiting for transaction to be completed...`);
  const receipt = await transaction.wait();
  console.log(`Educator Badge ID ${badgeId} minted to ${receiverAddress}`);
}

task("giveBadge", "Mint Edcuator badge to a user making them eligible for minting courses").addParam("receiver", "receiver address").addParam("badge", "ID of badge to mint").setAction(giveBadge);