// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// Source : https://github.com/Web3Samaj/owlearn-contracts/blob/5-feat-coursefactory/apps/contracts/src/CourseFactory.sol

import "../OwlearnCourse/OwlearnCourse.sol";
import {CourseFactoryStorage, OwlearnEducatorBadge} from "./CourseFactoryStorage.sol";

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @title OwlearnCourseFactory
/// @notice A Factory contract to create a new course with create2 method
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
// storage contracts should always be inherited last
contract OwlearnCourseFactory is OwnableUpgradeable, CourseFactoryStorage {
    /*///////////////////// Events //////////////////////////////////*/
    event CourseCreated(
        address indexed courseAddress,
        string courseName,
        string courseSymbol,
        address indexed creator,
        string courseURI,
        string[] courseNFTURIs,
        string certificateBaseURI
    );

    /*///////////////////// Constructor //////////////////////////////////*/
    /**
     * @dev Lock implementation contract
     */
    constructor() {
        // disabling initialisation of implementation contract to prevent attacks
        // _disableInitializers();
    }

    /*======================== Initializer Functions ========================*/
    function initialize(
        OwlearnEducatorBadge educatorBadgeNFT
    ) external initializer {
        __Ownable_init();
        educateBadgeNFT = educatorBadgeNFT;
    }

    /*///////////////////// Modifier //////////////////////////////////*/

    modifier onlyEducatorBadgeHolder() {
        require(
            educateBadgeNFT.balanceOf(msg.sender, 1) == 1,
            "ONLY EDUCATOR BADGE HOLDERS ALLOWED"
        );
        _;
    }

    /*///////////////////////////////////////////////////////////////
                           External Functions
    //////////////////////////////////////////////////////////////*/
    /**
     * @dev create a new course by deploying a Course Contract
     *
     * @param creatorId -Id of the creator creating the course , needs to be fetched directly from the msg.sender , Manually for now
     * @param courseName -Name of the new course to be created
     * @param courseSymbol -Name of the new course to be created
     * @param courseURI  courseURI , containing any extra course Info
     * @param courseNFTURIs  courseNFTURIs to be minted first, containing info about the particular resource
     * @param certificateBaseURI -NFT URI , dynamic , off-chain server link , fetching progree & certificates for a Course Learner
     *
     * @return course address of the newly deployed contract
     * @return courseId Id of the course being deployed
     */
    function createCourse(
        uint creatorId,
        string memory courseName,
        string memory courseSymbol,
        string memory courseURI,
        string[] memory courseNFTURIs,
        string memory certificateBaseURI
    ) external onlyEducatorBadgeHolder returns (address course, uint courseId) {
        courseId = totalCourses;
        totalCourses += 1;
        bytes32 salt = keccak256(abi.encodePacked(courseName, courseSymbol));
        OwlearnCourse _newCourse = new OwlearnCourse{salt: salt}();
        _newCourse.initialize(
            creatorId,
            courseId,
            courseName,
            courseSymbol,
            msg.sender,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
        // OwlearnCourse _newCourse = _deployContract(bytecode, salt);

        getCourse[courseId] = address(_newCourse);

        allCourses.push(address(_newCourse));
        emit CourseCreated(
            address(_newCourse),
            courseName,
            courseSymbol,
            msg.sender,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
        return (address(_newCourse), courseId);
    }

    /*///////////////////////////////////////////////////////////////
                           Internal Functions
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev deploy the new Course Contract
     *
     * @param bytecode - bytecode of the new Course contract to be deployed
     * @param salt - Salt for the new Course contract , to add the variation
     *
     * @return _newCourse -  the new OwlearnCourse Contract deployed
     */
    function _deployContract(
        bytes memory bytecode,
        bytes32 salt
    ) internal returns (OwlearnCourse _newCourse) {
        assembly {
            _newCourse := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
    }
}
