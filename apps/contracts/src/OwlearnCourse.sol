// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./OwlearnCourseCertificates.sol";
import "./OwlearnCourseResources.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title OwlearnCourse
/// @notice Course Master Contract , Single Point of Entry to create , and manage Course with Resource & Certificates Contract
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// @notice OwlearnCourseResource is this inherited and the same contract
/// @notice Certificate Contract is external contract
contract OwlearnCourse is Ownable {
    /*======================== Initialised Certificates & Resource contract ========================*/

    OwlearnCourseCerticates public courseCertificates;

    OwlearnCourseResources public courseResources;

    /*======================== Constructor Functions ========================*/

    /**
     * @dev Intialise the course by creating Resource and Certificates Contract
     *
     * @param courseName  Name of the Course , will also be the name of NFT Collection
     * @param courseSymbol  Symbol of the Course , will be the symbol of NFT Collection
     * @param courseCreator  creator of the Course , who will also control the Collection
     * @param courseURI  courseURI , containing any extra course Info , not to be stored on-chain
     * @param courseNFTURIs  courseNFTURIs to be minted , containing info about the particular resource
     * @param certificateBaseURI   NFT URI , dynamic , off-chain server link , fetching progree & certificates for a Course Learner
     */
    constructor(
        string memory courseName,
        string memory courseSymbol,
        address courseCreator,
        string memory courseURI,
        string[] memory courseNFTURIs,
        string memory certificateBaseURI
    ) {
        courseResources = new OwlearnCourseResources(
            courseName,
            courseSymbol,
            courseCreator,
            courseURI,
            courseNFTURIs,
            address(this)
        );

        string memory certificateName = string(
            abi.encodePacked("Certificate Badge for", courseName)
        );
        string memory certificateSymbol = string(
            abi.encodePacked("CB_", courseSymbol)
        );

        courseCertificates = new OwlearnCourseCerticates(
            certificateName,
            certificateSymbol,
            certificateBaseURI,
            courseCreator
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
     */
    function mintCourseCertificate() public {
        courseCertificates.safeMint(msg.sender);
    }

    // @dev All other Certificate functions like Burn or Mint are to be accessed from the main contract
}
