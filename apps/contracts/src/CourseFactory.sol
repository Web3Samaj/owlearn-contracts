// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// Source : https://github.com/Web3Samaj/owlearn-contracts/blob/5-feat-coursefactory/apps/contracts/src/CourseFactory.sol

import "./OwlearnCourse.sol";
import "./OwlearnEducatorBadge.sol";

/// @title CourseFactory
/// @notice A Factory contract to create a new course with create2 method
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract CourseFactory {
    /*======================== Mappings & Variables  ========================*/

    mapping(uint courseId => address courseCollectionAddress) public getCourse;
    uint private _totalCourses = 1;
    address[] public allCourses;

    OwlearnEducatorBadge private _educatorBadgeNFT;

    /*======================== Event ========================*/

    event CourseCreated(address indexed courseAddress, address indexed creator);

    /*======================== Constructor ========================*/

    constructor(OwlearnEducatorBadge educatorBadgeNFT) {
        _educatorBadgeNFT = educatorBadgeNFT;
    }

    /*======================== Modifier Functions ========================*/

    modifier onlyEducatorBadgeHolder() {
        require(
            _educatorBadgeNFT.balanceOf(msg.sender, 1) == 1,
            "ONLY EDUACATOR BADGE HOLDERS ALLOWED"
        );
        _;
    }

    // =============================================================
    //                           EXTNERNAL FUNCTIONS
    // =============================================================
    /**
     * @dev create a new course by deploying a Course Contract
     *
     * @return course address of the newly deployed contract
     * @return courseId Id of the course being deployed
     */
    function createCourse()
        external
        onlyEducatorBadgeHolder
        returns (address course, uint courseId)
    {
        bytes memory bytecode = type(OwlearnCourse).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        assembly {
            course := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        // initialize with the inputs
        courseId = _totalCourses;
        getCourse[courseId] = course;
        _totalCourses += 1;
        allCourses.push(course);
        emit CourseCreated(address(course), msg.sender);
    }
}
