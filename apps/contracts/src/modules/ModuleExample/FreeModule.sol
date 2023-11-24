// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnModuleBase} from "../Base/OwlearnModuleBase.sol";

contract FreeModule is OwlearnModuleBase {
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
    ) external override {}

    /**
     * @dev Hook called before Minting the certificate NFT
     *
     * @param creatorId  Course Creator Id
     * @param courseId  Course ID for which the module is being used
     * @param user User minting the certificate
     * @param data External Data  , sent by the USER during the mint Call
     */
    function beforeMint(
        uint creatorId,
        uint courseId,
        address user,
        bytes calldata data
    ) external payable override {
        // Need to add the treasury transfer if present including a Method to store treasury info
    }

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
    ) external override {}
}
