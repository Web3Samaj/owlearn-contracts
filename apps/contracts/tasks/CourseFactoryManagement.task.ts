import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CONTRACT_NAMES } from "../config/constants";
import { OwlearnCourse__factory } from "../typechain-types";

interface CreateCourseArgs {}

async function createCourse(
  {}: CreateCourseArgs,
  hre: HardhatRuntimeEnvironment
) {}

task("createCourse", "Create an Owlearn Course from the Course factory")
  .addParam("course")
  .setAction(createCourse);
