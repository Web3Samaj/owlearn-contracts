// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnModuleBaseStorage} from "./OwlearnModuleBaseStorage.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @title MintModuleBase
/// @notice Base Module Contract for Owlearn Mint Module
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// @notice Add Call restricitions , which contract can actually call these
abstract contract OwlearnModuleBase is Initializable, OwlearnModuleBaseStorage {
    // /*======================== Constructor Functions ========================*/

    // /**
    //  * @dev Intialise the Module with basic contract Data Initialiser
    //  *
    //  * @param _course  Course Contract address for which the Module is minted for
    //  */
    // function initialize(address _course) external initializer {
    //     owlearnCourse = _course;
    // }

    /*======================== Modifier Functions ========================*/

    // modifier onlyCourse() {
    //     require(msg.sender == owlearnCourse, "ONLY COURSE");
    //     _;
    // }

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
