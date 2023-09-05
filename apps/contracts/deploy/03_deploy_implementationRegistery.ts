import { ImplementationRegistery } from "../typechain-types";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";

const contractName = CONTRACT_NAMES.ImplementationRegistery;

const deployImplementationRegistery: DeployFunction = async (
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
  const implementationRegisteryFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  console.log(
    (
      await ethers.provider.estimateGas({
        data: implementationRegisteryFactory.interface.encodeDeploy(),
      })
    ).toString()
  );

  console.log(
    `Deploying ${contractName} on network ${network.name} using address ${deployer.address}`
  );

  // deploy
  const implementationRegistery = (await upgrades.deployProxy(
    implementationRegisteryFactory,
    {
      kind: "uups",
    }
  )) as ImplementationRegistery;
  await implementationRegistery.deployed();

  // Owlearn ID
  const ImplementationRegisteryArtifact = await getExtendedArtifact(
    contractName
  );
  await save(contractName, {
    ...ImplementationRegisteryArtifact,
    address: implementationRegistery.address,
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
            address: implementationRegistery.address,
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

deployImplementationRegistery.tags = [contractName];
export default deployImplementationRegistery;
