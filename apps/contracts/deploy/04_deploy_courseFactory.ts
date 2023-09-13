import { Address, DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnCourseFactory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const contractName = CONTRACT_NAMES.OwlearnCourseFactory;

const deployGeneric =
  (deploy: any, deployer: SignerWithAddress) =>
  async (contractToBeDeployed: string): Promise<Address> => {
    console.log(
      `Deploying implementation for ${contractToBeDeployed} using ${deployer.address}`
    );
    const { address: implementation } = await deploy(contractToBeDeployed, {
      from: deployer.address,
      args: [],
      log: true,
    });
    return implementation;
  };

const deployCourseFactory: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  // destructre HRE
  const { ethers, network, deployments, upgrades } = hre;

  // get signers
  const [deployer] = await ethers.getSigners();

  // destructure deployments object
  const { save, getExtendedArtifact, deploy } = deployments;

  const deployWithSigner = deployGeneric(deploy, deployer);

  // deploy course
  const owlearnCourseImplementation = await deployWithSigner(
    CONTRACT_NAMES.OwlearnCourse
  );

  // deploy resource
  const owlearnCertificatesImplementation = await deployWithSigner(
    CONTRACT_NAMES.OwlearnCourseCertificates
  );

  // deploy certificates
  const owlearnResourcesImplementation = await deployWithSigner(
    CONTRACT_NAMES.OwlearnCourseResources
  );

  // get educator badge
  const { address: educatorBadgeAddress } = await ethers.getContract(
    CONTRACT_NAMES.OwlearnEducatorBadge
  );

  const { address: moduleRegisteryAddress } = await ethers.getContract(
    CONTRACT_NAMES.OwlearnModuleRegistery
  );

  const { address: implementationRegisteryAddress } = await ethers.getContract(
    CONTRACT_NAMES.ImplementationRegistery
  );

  // prepare arguments
  const courseFactoryArguments = [
    educatorBadgeAddress,
    owlearnCourseImplementation,
    owlearnResourcesImplementation,
    owlearnCertificatesImplementation,
    moduleRegisteryAddress,
    implementationRegisteryAddress,
  ];

  // get contract factory
  const courseFactoryFactory = await ethers.getContractFactory(
    contractName,
    deployer
  );

  console.log(
    "Gas consumption:",
    (
      await ethers.provider.estimateGas({
        data: courseFactoryFactory.interface.encodeDeploy(),
      })
    ).toString()
  );

  console.log(
    `Deploying ${contractName} on network ${network.name} using address ${deployer.address}`
  );

  // deploy
  const courseFactory = (await upgrades.deployProxy(
    courseFactoryFactory,
    courseFactoryArguments,
    {
      kind: "uups",
    }
  )) as OwlearnCourseFactory;
  await courseFactory.deployed();

  // Owlearn ID
  const CourseFactoryArtifact = await getExtendedArtifact(contractName);
  await save(contractName, {
    ...CourseFactoryArtifact,
    address: courseFactory.address,
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
          // Course
          await hre.run("verify:verify", {
            address: owlearnCourseImplementation,
          });
          // Certificates
          await hre.run("verify:verify", {
            address: owlearnCertificatesImplementation,
          });
          // Resources
          await hre.run("verify:verify", {
            address: owlearnResourcesImplementation,
          });
          // Course Factory
          await hre.run("verify:verify", {
            address: courseFactory.address,
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

deployCourseFactory.tags = [contractName];
export default deployCourseFactory;
