import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const {ethers, deployments} = hre;

    const [deployer] = await ethers.getSigners();

    const {deploy} = deployments;

    console.log(deployer.address);

    const {address: counterAddress} = await deploy("Counter", {
        from: deployer.address,
        args: [],
        log: true
    });
}

deployFunction.tags = ["Counter"];
export default deployFunction;