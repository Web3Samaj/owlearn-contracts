import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnCourse__factory } from "../typechain-types";

interface CreateCourseArgs {
  contract: string;
  contractArgs?: any[];
}

async function createCourse(
  { contract: contractName, contractArgs }: CreateCourseArgs,
  hre: HardhatRuntimeEnvironment
) {
  const { ethers, network, deployments, upgrades } = hre;

  // get signers
  const [deployer] = await ethers.getSigners();

  // destructure deployments object
  const { save, getExtendedArtifact } = deployments;

  const contractFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  const { address: proxyAddress } = await ethers.getContract(contractName);

  console.log(
    `Upgrading ${contractName} on network ${network.name} using address ${deployer.address} for the proxy ${proxyAddress}`
  );

  const contract = await upgrades.upgradeProxy(proxyAddress, contractFactory, {
    constructorArgs: contractArgs,
  });
  await contract.deployed();

  const contractArtifact = await getExtendedArtifact(contractName);

  await save(contractName, {
    ...contractArtifact,
    address: contract.address,
  });
  // We can also save implementations & deployement history
  console.log(`${contractName} Artifacts Saved`);

  await new Promise((resolve, reject) => {
    setTimeout(async () => {
      // Verify Contract on etherscan
      console.log("Verifying contract on Etherscan");
      if (network.name === "hardhat" || network.name === "localhost") {
        console.log("Etherscan doesn't support network");
      } else {
        try {
          // OwlearnID
          await hre.run("verify:verify", {
            address: contract.address,
          });
        } catch (e) {
          console.log(e);
        }
        console.log("Contract Verified");
      }
      resolve(1);
    }, 15000);
  });
}

task("upgrade", "Upgrade a UUPS compatible contract")
  .addParam("contract")
  .addOptionalParam("contractArgs")
  .setAction(createCourse);
