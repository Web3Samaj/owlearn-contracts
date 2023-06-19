// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// Source : https://github.com/Web3Samaj/owlearn-contracts/blob/5-feat-coursefactory/apps/contracts/src/CourseFactory.sol

import "./OwlearnCourse.sol";

/// @title CourseFactory
/// @notice A Factory contract to create a new course with create2 method
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract CourseFactory {
    /*///////////////////// Mappings & Variables //////////////////////////////////*/

    mapping(uint courseId => address courseCollectionAddress) public getCourse;
    uint private totalCourses = 1;
    address public allCourses;

    /*///////////////////// Events //////////////////////////////////*/
    event CourseCreated(address indexed courseAddress, address indexed creator);

    constructor() public {}

    /*///////////////////////////////////////////////////////////////
                           Functions
    //////////////////////////////////////////////////////////////*/
    /**
     * @dev create a new course by deploying a Course Contract
     *
     * @return course address of the newly deployed contract
     * @return courseId Id of the course being deployed
     */
    function createCourse() public returns (address course, uint courseId) {
        bytes memory bytecode = type(CourseContract).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        assembly {
            course := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        // initialize with the inputs
        courseId = totalCourses;
        getCourse[courseId] = course;
        totalCourses += 1;
        allCourses.push(course);
        emit CourseCreated(address(course), msg.sender);
    }
}
