import { OwlearnModuleRegistery } from "../typechain-types";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";

const contractName = CONTRACT_NAMES.OwlearnModuleRegistery;

const deployOwlearnModuleRegistery: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  // destructre HRE
  const { ethers, network, deployments, upgrades } = hre;

  // get signers
  const [deployer] = await ethers.getSigners();

  // destructure deployments object
  const { save, getExtendedArtifact } = deployments;

  // prepare arguments

  // get contract factory
  const owlearnModuleRegisteryFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  console.log(
    (
      await ethers.provider.estimateGas({
        data: owlearnModuleRegisteryFactory.interface.encodeDeploy(),
      })
    ).toString()
  );

  console.log(
    `Deploying ${contractName} on network ${network.name} using address ${deployer.address}`
  );

  // deploy
  const owlearnModuleRegistery = (await upgrades.deployProxy(
    owlearnModuleRegisteryFactory,
    {
      kind: "uups",
    }
  )) as OwlearnModuleRegistery;
  await owlearnModuleRegistery.deployed();

  // Owlearn ID
  const OwlearnModuleRegisteryArtifact = await getExtendedArtifact(
    contractName
  );
  await save(contractName, {
    ...OwlearnModuleRegisteryArtifact,
    address: owlearnModuleRegistery.address,
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
            address: owlearnModuleRegistery.address,
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

deployOwlearnModuleRegistery.tags = [contractName];
export default deployOwlearnModuleRegistery;
