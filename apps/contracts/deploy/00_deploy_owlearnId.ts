import { OwlearnId } from "../typechain-types";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  CONTRACT_NAMES,
  OwlearnID_Domain_name,
  LENS_HUB,
  ALLOW_LIST_ROOT,
  BLACK_LIST_ROOT,
} from "../config/constants";

const contractName = CONTRACT_NAMES.OwlearnId;

const deployOwlearnId: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  // destructre HRE
  const { ethers, network, deployments, upgrades } = hre;

  // get signers
  const [deployer] = await ethers.getSigners();

  // destructure deployments object
  const { save, getExtendedArtifact } = deployments;

  // prepare arguments
  const owlearnIdArguments = [
    OwlearnID_Domain_name,
    LENS_HUB,
    ALLOW_LIST_ROOT,
    BLACK_LIST_ROOT,
  ];

  // get contract factory
  const owlearnIdFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  console.log(
    (
      await ethers.provider.estimateGas({
        data: owlearnIdFactory.interface.encodeDeploy(),
      })
    ).toString()
  );

  console.log(
    `Deploying ${contractName} on network ${network.name} using address ${deployer.address}`
  );

  // deploy
  const owlearnId = (await upgrades.deployProxy(
    owlearnIdFactory,
    owlearnIdArguments,
    {
      kind: "uups",
    }
  )) as OwlearnId;
  await owlearnId.deployed();

  // Owlearn ID
  const OwlearnIdArtifact = await getExtendedArtifact(contractName);
  await save(contractName, {
    ...OwlearnIdArtifact,
    address: owlearnId.address,
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
            address: owlearnId.address,
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

deployOwlearnId.tags = [contractName];
export default deployOwlearnId;
