// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// Source : https://github.com/Web3Samaj/owlearn-contracts/blob/5-feat-coursefactory/apps/contracts/src/CourseFactory.sol

import "../OwlearnCourse/OwlearnCourse.sol";
import {CourseFactoryStorage, OwlearnEducatorBadge} from "./CourseFactoryStorage.sol";

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CourseProxy} from "../Proxy/CourseProxy.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title OwlearnCourseFactory
/// @notice A Factory contract to create a new course with create2 method
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
// storage contracts should always be inherited last
contract OwlearnCourseFactory is
    OwnableUpgradeable,
    CourseFactoryStorage,
    UUPSUpgradeable
{
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

    /**
     * @dev create a new course by deploying a Course Contract
     *
     * @param educatorBadgeNFT - Educator Badge NFT contract address
     * @param moduleRegisteryAddress - Module Whitelisting registery
     */
    function initialize(
        OwlearnEducatorBadge educatorBadgeNFT,
        address _courseImplementation,
        address _resourceImplementation,
        address _certificateImplementation,
        address moduleRegisteryAddress
    ) external initializer {
        __Ownable_init();
        educateBadgeNFT = educatorBadgeNFT;
        courseImplementation = _courseImplementation;
        resourceImplementation = _resourceImplementation;
        certificateImplementation = _certificateImplementation;
        moduleRegistery = moduleRegisteryAddress;
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
        totalCourses += 1;
        courseId = totalCourses;
        bytes32 salt = keccak256(abi.encodePacked(courseName, courseSymbol));
        bytes memory initData = abi.encodeWithSelector(
            OwlearnCourse.initialize.selector,
            creatorId,
            courseId,
            courseName,
            courseSymbol,
            msg.sender,
            courseURI,
            courseNFTURIs,
            certificateBaseURI,
            resourceImplementation,
            certificateImplementation,
            moduleRegistery
        );

        address _newCourse = address(
            new CourseProxy{salt: salt}(courseImplementation, initData)
        );

        getCourse[courseId] = _newCourse;

        allCourses.push(_newCourse);
        emit CourseCreated(
            _newCourse,
            courseName,
            courseSymbol,
            msg.sender,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
        return (_newCourse, courseId);
    }

    /**
     * @dev function to control or authorize the Upgrade
     *
     * @param newImplementation - New Implementation address for the course Factory
     */
    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}

    /**
     * @dev Update the Educator Badge In Case needed
     *
     * @param educatorBadgeNFT - new Educator Badge NFT instance
     */
    function updateEducatorBadge(
        OwlearnEducatorBadge educatorBadgeNFT
    ) external onlyOwner {
        educateBadgeNFT = educatorBadgeNFT;
    }

    /**
     * @dev Update the New Owlearn Resource Implementation
     *
     * @param _resourceImplementation - new updated resource Implementation
     */
    function updateResourceImpl(
        address _resourceImplementation
    ) external onlyOwner {
        resourceImplementation = _resourceImplementation;
    }

    /**
     * @dev Update the New Owlearn Certificate Implementation
     *
     * @param _certificateImplementation - new updated certificate Implementation
     */
    function updateCertificateImpl(
        address _certificateImplementation
    ) external onlyOwner {
        certificateImplementation = _certificateImplementation;
    }

    /**
     * @dev Update the New Owlearn Course Implementation
     *
     * @param _courseImplementation - new updated course Implementation
     */
    function updateCourseImpl(
        address _courseImplementation
    ) external onlyOwner {
        courseImplementation = _courseImplementation;
    }

    /**
     * @dev Update the New Module Registery
     *
     * @param moduleRegisteryAddress - new module registery address
     */
    function updateModuleRegistery(
        address moduleRegisteryAddress
    ) external onlyOwner {
        moduleRegistery = moduleRegisteryAddress;
    }
}
