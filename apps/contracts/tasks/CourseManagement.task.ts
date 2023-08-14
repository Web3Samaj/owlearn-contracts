import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import prompt from "prompt";
import { CONTRACT_NAMES } from "../config/constants";

const factoryContractName = CONTRACT_NAMES.OwlearnCourseFactory;

interface CreateNewCourseUserArguments {
  inputs: string;
}

interface InputsFileType {
  creatorId: number;
  courseName: string;
  courseSymbol: string;
  courseURI: string;
  courseNFTURIs: Array<string>;
  certificateBaseURI: string;
}

async function createNewCourse(
  { inputs: inputFileName }: CreateNewCourseUserArguments,
  hre: HardhatRuntimeEnvironment
): Promise<void> {
  prompt.start();
  const { ethers, network } = hre;
  console.log(`Deploying new Course on ${network.name}`);

  // fetch input file
  const inputs: InputsFileType = await import(
    "../config/inputs/" + inputFileName
  );

  console.log(
    "Newly deployed Owlearn Course will have following arguments:",
    inputs
  );

  const {
    creatorId,
    courseName,
    courseSymbol,
    courseURI,
    courseNFTURIs,
    certificateBaseURI,
  } = inputs;

  // get Course Factory Instance
  const factoryInstance = await ethers.getContract(factoryContractName);

  console.log(
    `Newly Owlearn Course will be created using following Course Factory: ${factoryInstance.address}`
  );
  await prompt.get({
    description: "Hit Y/y to continue",
    required: true,
  });

  // construct arguments
  const courseArgs = [
    creatorId,
    courseName,
    courseSymbol,
    courseURI,
    courseNFTURIs,
    certificateBaseURI,
  ] as const;

  // create new Owlearn Course
  console.log("Creating new Owlearn Course instance...");
  const transaction = await factoryInstance.createCourse(...courseArgs);
  // wait for receipt
  console.log("Transaction Successfully sumbitted. Waiting for receipt...");
  const receipt = await transaction.wait();

  const creationEvent = receipt?.events?.filter(
    (eventObject: any) => eventObject.event === "CourseCreated"
  )[0];

  const courseAddress = creationEvent?.args?.courseAddress;

  console.log(
    `New Owlearn Course created at instance ${courseAddress} on network: ${network.name}`
  );
}

task("createNewCourse", "Create new course")
  .addParam("inputs", "Input file name in ./config/inputs/ directory")
  .setAction(createNewCourse);

task("upgradeCourseImplementation", "Upgrade course implementation to new version");
task("upgradeCertificateImplementation", "Upgrade certificate implementation");
task("upgradeResourceImplementation", "Upgrade resource implementation");

