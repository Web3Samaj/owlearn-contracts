// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// Source : https://github.com/Web3Samaj/owlearn-contracts/blob/5-feat-coursefactory/apps/contracts/src/CourseFactory.sol

import "./OwlearnCourse.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title OwlearnCourseFactory
/// @notice A Factory contract to create a new course with create2 method
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnCourseFactory is Ownable {
    /*///////////////////// Mappings & Variables //////////////////////////////////*/

    mapping(uint courseId => address courseCollectionAddress) public getCourse;
    uint public totalCourses = 1;
    address[] public allCourses;

    struct CourseCreationProps {
        string courseName;
        string courseSymbol;
        address courseCreator;
        string courseURI;
        string[] courseNFTURIs;
        string certificateBaseURI;
    }

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

    constructor() public {}

    /*///////////////////////////////////////////////////////////////
                           External Functions
    //////////////////////////////////////////////////////////////*/
    /**
     * @dev create a new course by deploying a Course Contract
     *
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
        string memory courseName,
        string memory courseSymbol,
        string memory courseURI,
        string[] memory courseNFTURIs,
        string memory certificateBaseURI
    ) external returns (address course, uint courseId) {
        bytes memory bytecode = _getByteCode(
            courseName,
            courseSymbol,
            msg.sender,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
        bytes32 salt = keccak256(abi.encodePacked(courseName, courseSymbol));
        // OwlearnCourse _newCourse = new OwlearnCourse{salt: salt}(
        //     courseName,
        //     courseSymbol,
        //     msg.sender,
        //     courseURI,
        //     courseNFTURIs,
        //     certificateBaseURI
        // );
        OwlearnCourse _newCourse = _deployContract(bytecode, salt);

        courseId = totalCourses;
        getCourse[courseId] = _newCourse;
        totalCourses += 1;
        allCourses.push(_newCourse);
        emit CourseCreated(
            address(_newCourse),
            courseName,
            courseSymbol,
            msg.sender,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
    }

    /**
     * @dev get Address for the contract to be deployed
     *
     * @param courseName -Name of the new course to be created
     * @param courseSymbol -Name of the new course to be created
     * @param courseCreator  creator of the Course , who will also control the Collection
     * @param courseURI  courseURI , containing any extra course Info
     * @param courseNFTURIs  courseNFTURIs to be minted first, containing info about the particular resource
     * @param certificateBaseURI -NFT URI , dynamic , off-chain server link , fetching progree & certificates for a Course Learner
     *
     * @return -  address of the new Course Contract to be deployed
     */
    function getAddress(
        string memory courseName,
        string memory courseSymbol,
        address courseCreator,
        string memory courseURI,
        string[] memory courseNFTURIs,
        string memory certificateBaseURI
    ) public returns (address) {
        bytes memory bytecode = _getByteCode(
            courseName,
            courseSymbol,
            courseCreator,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
        bytes32 salt = keccak256(abi.encodePacked(courseName, courseSymbol));

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint(hash)));
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
     * @return -  the new OwlearnCourse Contract deployed
     */
    function _deployContract(
        bytes memory bytecode,
        bytes32 salt
    ) internal returns (OwlearnCourse) {
        assembly {
            _newCourse := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        return _newCourse;
    }

    /**
     * @dev get ByteCode for the contract to be deployed
     *
     * @param courseName -Name of the new course to be created
     * @param courseSymbol -Name of the new course to be created
     * @param courseCreator  creator of the Course , who will also control the Collection
     * @param courseURI  courseURI , containing any extra course Info
     * @param courseNFTURIs  courseNFTURIs to be minted first, containing info about the particular resource
     * @param certificateBaseURI -NFT URI , dynamic , off-chain server link , fetching progree & certificates for a Course Learner
     *
     * @return byteCode of the new Contract to be deployed
     */
    function _getByteCode(
        string memory courseName,
        string memory courseSymbol,
        address courseCreator,
        string memory courseURI,
        string[] memory courseNFTURIs,
        string memory certificateBaseURI
    ) internal pure returns (bytes memory) {
        bytes memory bytecode = type(OwlearnCourse).creationCode;
        return
            abi.encodePacked(
                bytecode,
                (
                    courseName,
                    courseSymbol,
                    courseCreator,
                    courseURI,
                    courseNFTURIs,
                    certificateBaseURI
                )
            );
    }
}
