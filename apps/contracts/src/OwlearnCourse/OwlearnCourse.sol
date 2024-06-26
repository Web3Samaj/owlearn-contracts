// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnCourseStorage, OwlearnCourseCertificates, OwlearnCourseResources, OwlearnModuleRegistery} from "./OwlearnCourseStorage.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../interfaces/IMintModule.sol";
import {CertificateProxy} from "../Proxy/CertificateProxy.sol";
import {ResourceProxy} from "../Proxy/ResourceProxy.sol";
import {ImplementationRegistery} from "../Implementation/ImplementationRegistery.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title OwlearnCourse
/// @notice Course Master Contract , Single Point of Entry to create , and manage Course with Resource & Certificates Contract
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnCourse is
    OwnableUpgradeable,
    OwlearnCourseStorage,
    UUPSUpgradeable
{
    /*///////////////////// Constructor //////////////////////////////////*/
    event CourseInitialised(
        address indexed course,
        address indexed resource,
        address indexed certificates
    );
    event MintModuleInitialised(
        address indexed course,
        address indexed moduleAddress
    );
    event MintModuleDisabled(address indexed course);

    /*///////////////////// Constructor //////////////////////////////////*/
    /**
     * @dev Lock implementation contract
     */
    constructor() {
        // disabling initialisation of implementation contract to prevent attacks
        _disableInitializers();
    }

    /*======================== Modifier Functions ========================*/
    modifier onlyApprovedImplementation(address newImplementation) {
        require(
            implRegistery.getWhitelistedCourseImplementation(newImplementation),
            "IMPLEMENETATION NOT APPROVED"
        );
        _;
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
     * @param moduleRegisteryAddress Module Registery for the Owlearn Protocol , only set by courseFactory
     * @param implmRegisteryAddress implm Registery for the Owlearn Protocol , only set by courseFactory
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
        address _certificateImplementation,
        address moduleRegisteryAddress,
        address implmRegisteryAddress
    ) external payable initializer {
        // initialise ownable contract
        __Ownable_init();
        // transfer ownership to course creator as the deployer of this contract will be CourseFactory
        _transferOwnership(courseCreator);
        creatorId = _creatorId;
        courseId = _courseId;
        // Module registery
        moduleRegistery = OwlearnModuleRegistery(moduleRegisteryAddress);
        implRegistery = ImplementationRegistery(implmRegisteryAddress);

        bytes memory resourceInitCode = abi.encodeWithSelector(
            OwlearnCourseResources.initialize.selector,
            courseName,
            courseSymbol,
            courseCreator,
            courseURI,
            courseNFTURIs,
            address(this),
            implmRegisteryAddress
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
            courseCreator,
            implmRegisteryAddress
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

        emit CourseInitialised(
            address(this),
            address(courseResources),
            address(courseCertificates)
        );
    }

    /*======================== Module Functions ========================*/

    /**
     * @dev Set a new mint Module & Initilaise it from the mint module contract
     *
     * @param _mintModule  mint Module address to be set
     * @param data User data containing extra info to the mintModule Initialise functions
     */
    function setAndInitialiseMintModule(
        address _mintModule,
        bytes calldata data
    ) external onlyOwner {
        require(
            moduleRegistery.getWhitelistedModules(_mintModule),
            "MODULE NOT WHITELISTED"
        );
        mintModule = _mintModule;
        IMintModule(_mintModule).initialiseMintModule(
            creatorId,
            courseId,
            data
        );
        emit MintModuleInitialised(address(this), _mintModule);
    }

    /**
     * @dev disable the mint module by reassigning it to address(0)
     */
    function disableModule() external onlyOwner {
        mintModule = address(0);
        emit MintModuleDisabled(address(this));
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
     * TASK  : Add customization tasks
     */
    function mintCourseCertificate(
        address to,
        bytes calldata data
    ) public payable returns (uint tokenId) {
        if (mintModule != address(0)) {
            // Need to approve the Tokens to this mintModule
            IMintModule(mintModule).beforeMint{value: msg.value}(
                creatorId,
                courseId,
                to,
                data
            );
        }

        tokenId = courseCertificates.safeMint(to);

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

    function _authorizeUpgrade(
        address newImplementation
    )
        internal
        virtual
        override
        onlyApprovedImplementation(newImplementation)
        onlyOwner
    {}

    ///@dev All other Certificate functions like Burn or Mint are to be accessed from the main contract
    ///@dev All other Resource functions like balance and owner are to be accessed from the main contract
}
