// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnModuleBaseStorage} from "./OwlearnModuleBaseStorage.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @title MintModuleBase
/// @notice Base Module Contract for Owlearn Mint Module
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// @notice Add Call restricitions , which contract can actually call these
abstract contract OwlearnModuleBase is Initializable, OwlearnModuleBaseStorage {
    /*======================== Constructor Functions ========================*/
    /// Constructor can be used to set few variables at the time of deploy

    /*======================== Modifier Functions ========================*/
    /// It is upto the User to add modifier to their modules , as they have the freedom to modify it according to them
    /// But the modules can't be controlled by any entity
    /// The modules will be audited by the Owlearn Protocol before allowed in the whitelist

    /*======================== External Virtual Functions ========================*/

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
    ) external {}

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
    ) external {}

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
    ) external {}
}
