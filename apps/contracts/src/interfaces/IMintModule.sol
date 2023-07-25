// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

/// @title IMintModule
/// @notice Interface for creating a new Mint Module for Owlearn Courses
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
interface IMintModule {
    /**
     * @dev for initialising the actual Owlearn Course Data for this contract
     *
     * @param creatorId  Course Creator Id
     * @param courseId  Course ID for which the module is being initialised
     * @param data External Data  , sent by the USER during the initialise Call
     */
    function initialiseMintModule(
        uint creatorId,
        uint courseId,
        bytes calldata data
    ) external;

    /**
     * @dev Hook called before Minting the certificate NFT
     *
     * @param creatorId  Course Creator Id
     * @param courseId  Course ID for which the module is being used
     * @param recepient  Recepeint of the NFT Certificate Mint
     * @param data External Data  , sent by the USER during the mint Call
     */
    function beforeMint(
        uint creatorId,
        uint courseId,
        address recepient,
        bytes calldata data
    ) external;

    /**
     * @dev Hook called After Minting the certificate NFT
     *
     * @param creatorId  Course Creator Id
     * @param courseId  Course ID for which the module is being used
     * @param recepient  Recepeint of the NFT Certificate Mint
     * @param certificateTokenId  NFT token ID which is minted as certificate
     * @param data External Data  , sent by the USER during the mint Call
     */
    function afterMint(
        uint creatorId,
        uint courseId,
        address recepient,
        uint certificateTokenId,
        bytes calldata data
    ) external;
}
