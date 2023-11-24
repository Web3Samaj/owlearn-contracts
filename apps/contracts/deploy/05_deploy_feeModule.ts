import { FeeModule, OwlearnId } from "../typechain-types";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";

const contractName = CONTRACT_NAMES.FeeModule;

const deployFeeModule: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  // destructre HRE
  const { ethers, network, deployments, upgrades } = hre;

  // get signers
  const [deployer] = await ethers.getSigners();

  // destructure deployments object
  const { save, getExtendedArtifact } = deployments;

  // get contract factory
  const feeModuleFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  console.log(
    (
      await ethers.provider.estimateGas({
        data: feeModuleFactory.interface.encodeDeploy(),
      })
    ).toString()
  );

  console.log(
    `Deploying ${contractName} on network ${network.name} using address ${deployer.address}`
  );
  const { address: courseFactoryAddress } = await ethers.getContract(
    CONTRACT_NAMES.OwlearnCourseFactory
  );

  const feeModuleArguments = [courseFactoryAddress];

  // deploy
  const feeModule = (await upgrades.deployProxy(
    feeModuleFactory,
    feeModuleArguments,
    {
      kind: "uups",
    }
  )) as FeeModule;
  await feeModule.deployed();

  // Owlearn ID
  const feeModuleArtifact = await getExtendedArtifact(contractName);
  await save(contractName, {
    ...feeModuleArtifact,
    address: feeModule.address,
  });
  console.log(`${contractName} Artifacts Saved`);

  // verify contract
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
            address: feeModule.address,
          });
        } catch (e) {
          console.log(e);
        }
        console.log("Contract Verified");
      }
      resolve(1);
    }, 15000);
  });
};

deployFeeModule.tags = [contractName];
export default deployFeeModule;
