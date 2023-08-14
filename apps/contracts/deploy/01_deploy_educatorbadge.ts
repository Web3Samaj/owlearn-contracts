import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Basic_Educator_Badge_Token_URI, CONTRACT_NAMES } from "../config/constants";
import { OwlearnEducatorBadge } from "../typechain-types";

const contractName = CONTRACT_NAMES.OwlearnEducatorBadge;

const deployEducatorBadge: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  // destructre HRE
  const { ethers, network, deployments, upgrades } = hre;

  // get signers
  const [deployer] = await ethers.getSigners();

  // destructure deployments object
  const { save, getExtendedArtifact } = deployments;

  // prepare arguments
  const educatorBadgeArguments = [Basic_Educator_Badge_Token_URI];

  // get contract factory
  const educatorBadgeFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  console.log("Gas consumption:", (await ethers.provider.estimateGas({data: educatorBadgeFactory.interface.encodeDeploy()})).toString());

  console.log(
    `Deploying ${contractName} on network ${network.name} using address ${deployer.address}`
  );

  // deploy
  const educatorBadge = (await upgrades.deployProxy(
    educatorBadgeFactory,
    educatorBadgeArguments,
    {
      kind: "uups",
    }
  )) as OwlearnEducatorBadge;
  await educatorBadge.deployed();

  // Owlearn ID
  const EducatorBagdeArtifact = await getExtendedArtifact(contractName);
  await save(contractName, {
    ...EducatorBagdeArtifact,
    address: educatorBadge.address,
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
          // Owlearn Educator Badge
          await hre.run("verify:verify", {
            address: educatorBadge.address,
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

deployEducatorBadge.tags = [contractName];
export default deployEducatorBadge;
