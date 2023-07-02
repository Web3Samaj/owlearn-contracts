// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./OwlearnCourseCertificates.sol";
import "./OwlearnCourseResources.sol";

/// @title OwlearnCourse
/// @notice Course Master Contract , Single Point of Entry to create , and manage Course with Resource & Certificates Contract
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// @notice OwlearnCourseResource is this inherited and the same contract
/// @notice Certificate Contract is external contract
contract OwlearnCourse is OwlearnCourseResources {
    /*======================== Initialised Certificates contract ========================*/

    OwlearnCourseCerticates public courseCertificates;

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
    )
        OwlearnCourseResources(
            courseName,
            courseSymbol,
            courseCreator,
            courseURI,
            courseNFTURIs
        )
    {
        string memory certificateName = string(
            abi.encodePacked("Certificate Badge for", courseName)
        );
        string memory certificateSymbol = string(
            abi.encodePacked("CB_", courseSymbol)
        );

        courseCertificates = new OwlearnCourseCerticates(
            certificateName,
            certificateSymbol,
            certificateBaseURI
        );
    }

    /*======================== Certificate Functions ========================*/
    /**
     * @dev  Mint a Course Certificate NFT
     *
     * Add restrictions
     */
    function mintCourseCertificate() public {
        courseCertificates.safeMint(msg.sender);
    }

    // @dev All other Certificate functions like Burn or Mint are to be accessed from the main contract
}
