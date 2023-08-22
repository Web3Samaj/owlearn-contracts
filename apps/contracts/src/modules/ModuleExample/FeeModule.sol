// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnModuleBase} from "../Base/OwlearnModuleBase.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

struct FeeData {
    address currency;
    uint256 amount;
    address recepient;
    uint creatorId;
    uint courseId;
}

contract FeeModule is OwlearnModuleBase {
    using SafeERC20 for IERC20;

    mapping(address => FeeData) internal _feeData;

    constructor(address factory) OwlearnModuleBase(factory) {}

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
    ) external override onlyCourses(courseId) {
        (address currency, uint256 amount, address recepient) = abi.decode(
            data,
            (address, uint256, address)
        );

        require(recepient != address(0) && amount != 0, "INVALID PARAMS");

        address owlearnCourse = msg.sender;
        _feeData[owlearnCourse] = FeeData(
            currency,
            amount,
            recepient,
            creatorId,
            courseId
        );
    }

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
    ) external payable override onlyCourses(courseId) {
        address courseAddress = msg.sender;
        FeeData memory feeData = _feeData[courseAddress];

        // If Native currency , then transferred via Call
        if (feeData.currency == address(0)) {
            require(msg.value == feeData.amount, "INVALID AMOUNT SENT");
            (bool success, ) = feeData.recepient.call{value: feeData.amount}(
                ""
            );
            require(success, "TRANSFER FAILED");
        } else {
            // Otherwise it will be ERC20 tokens
            IERC20(feeData.currency).safeTransferFrom(
                user,
                feeData.recepient,
                feeData.amount
            );
        }

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
    ) external override onlyCourses(courseId) {}
}
