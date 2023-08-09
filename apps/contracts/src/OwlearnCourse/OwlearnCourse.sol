// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnCourseStorage, OwlearnCourseCertificates, OwlearnCourseResources} from "./OwlearnCourseStorage.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../interfaces/IMintModule.sol";
import {CertificateProxy} from "../Proxy/CertificateProxy.sol";
import {ResourceProxy} from "../Proxy/ResourceProxy.sol";

/// @title OwlearnCourse
/// @notice Course Master Contract , Single Point of Entry to create , and manage Course with Resource & Certificates Contract
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnCourse is OwnableUpgradeable, OwlearnCourseStorage {
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
     * @dev Intialise the course by creating Resource and Certificates Contract
     *
     * @param _creatorId  Id fo the Course Creator on Owlearn
     * @param _courseId  Id of the Course being created on Owlearn
     * @param courseName  Name of the Course , will also be the name of NFT Collection
     * @param courseSymbol  Symbol of the Course , will be the symbol of NFT Collection
     * @param courseCreator  creator of the Course , who will also control the Collection
     * @param courseURI  courseURI , containing any extra course Info , not to be stored on-chain
     * @param courseNFTURIs  courseNFTURIs to be minted , containing info about the particular resource
     * @param certificateBaseURI   NFT URI , dynamic , off-chain server link , fetching progree & certificates for a Course Learner
     */
    function initialize(
        uint _creatorId,
        uint _courseId,
        string memory courseName,
        string memory courseSymbol,
        address courseCreator,
        string memory courseURI,
        string[] memory courseNFTURIs,
        string memory certificateBaseURI,
        address _resourceImplementation,
        address _certificateImplementation
    ) external payable initializer {
        // initialise ownable contract
        __Ownable_init();
        // transfer ownership to course creator as the deployer of this contract will be CourseFactory
        _transferOwnership(courseCreator);
        creatorId = _creatorId;
        courseId = _courseId;
        bytes memory resourceInitCode = abi.encodeWithSelector(
            OwlearnCourseResources.initialize.selector,
            courseName,
            courseSymbol,
            courseCreator,
            courseURI,
            courseNFTURIs,
            address(this)
        );
        courseResources = OwlearnCourseResources(
            address(
                new ResourceProxy(_resourceImplementation, resourceInitCode)
            )
        );
        // initialise course resource contract

        string memory certificateName = string(
            abi.encodePacked("Certificate Badge for ", courseName)
        );
        string memory certificateSymbol = string(
            abi.encodePacked("CB_", courseSymbol)
        );

        bytes memory certificateInitCode = abi.encodeWithSelector(
            OwlearnCourseCertificates.initialize.selector,
            certificateName,
            certificateSymbol,
            certificateBaseURI,
            courseCreator
        );
        // deploy and initialize certificates
        courseCertificates = OwlearnCourseCertificates(
            address(
                new CertificateProxy(
                    _certificateImplementation,
                    certificateInitCode
                )
            )
        );
    }

    /*======================== Resource Functions ========================*/

    function setAndInitialiseMintModule(
        address _mintModule,
        bytes calldata data
    ) public onlyOwner {
        // Need to add a whitelist module check here
        mintModule = _mintModule;
        IMintModule(_mintModule).initialiseMintModule(
            creatorId,
            courseId,
            data
        );
    }

    /*======================== Resource Functions ========================*/

    /**
     * @dev mint new Course NFTs , after it is intialised once
     *
     * @param courseNFTURIs  courseNFTURIs to be minted , containing info about the particular resource
     */
    function mintCourseNFTs(string[] memory courseNFTURIs) external onlyOwner {
        courseResources.mintCourseNFTs(courseNFTURIs);
    }

    /**
     * @dev mint new Course NFTs , after it is intialised once
     *
     * @param tokenId  tokenId of the NFT for which resource is to be updated
     * @param newNFTURI  new & updated NFT URI containing info about the particular resource
     */
    function editCourseNFT(
        uint tokenId,
        string memory newNFTURI
    ) external onlyOwner {
        courseResources.editCourseNFT(tokenId, newNFTURI);
    }

    /**
     * @dev mint new Course NFTs , after it is intialised once
     *
     * @param tokenId  tokenId of the NFT for which resource is to be deleted
     */
    function deleteCourseNFT(uint tokenId) external onlyOwner {
        courseResources.deleteCourseNFT(tokenId);
    }

    /*======================== Certificate Functions ========================*/
    /**
     * @dev  Mint a Course Certificate NFT
     *
     * Add restrictions using modules
     * TASK  : Add customization tasks
     */
    function mintCourseCertificate(address to, bytes calldata data) public {
        if (mintModule != address(0)) {
            IMintModule(mintModule).beforeMint(creatorId, courseId, to, data);
        }

        uint tokenId = courseCertificates.safeMint(to);

        if (mintModule != address(0)) {
            IMintModule(mintModule).afterMint(
                creatorId,
                courseId,
                to,
                tokenId,
                data
            );
        }
    }

    ///@dev All other Certificate functions like Burn or Mint are to be accessed from the main contract
    ///@dev All other Resource functions like balance and owner are to be accessed from the main contract
}
