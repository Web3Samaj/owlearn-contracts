// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC1155URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import {ERC1155BurnableUpgradeable, ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import {ERC1155SupplyUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title OwlearnEducatorBadge
/// @notice An ERC1155 Contract as an Educator badge to all the educators on the platform , along with the badge Levels
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// Basic Educator Badge - Id - 1
contract OwlearnEducatorBadge is
    OwnableUpgradeable,
    ERC1155URIStorageUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable,
    UUPSUpgradeable
{
    /*======================== Constructor Functions ========================*/
    /**
     * @dev Lock implementation contract
     */
    constructor() {
        // disabling initialisation of implementation contract to prevent attacks
        // _disableInitializers();
    }

    /*======================== Initializer Functions ========================*/

    /**
     * @dev Intialise the Educator Badge NFT Collections
     *
     * @param token0URI  token URI of the Basic Educator badge id-0
     */
    function initialize(string memory token0URI) external initializer {
        __Ownable_init();
        __ERC1155_init("NULL");
        _setURI(1, token0URI);
    }

    // =============================================================
    //                           EXTNERNAL FUNCTIONS
    // =============================================================

    /**
     * @dev Set URI for a NFT Badge
     *
     * @param tokenId  token Id of the badge for which URI has to be sets
     * @param tokenURI  token URI of the new Badge to be set
     */
    function setURI(uint tokenId, string memory tokenURI) external onlyOwner {
        _setURI(tokenId, tokenURI);
    }

    /**
     * @dev Mint New Educator badges for the Educators
     *
     * @param account  address to which the badge to be minted
     * @param tokenId  token Id of the badge to be minted
     */
    function mintEducatorBadges(
        address account,
        uint tokenId
    ) external onlyOwner {
        _mint(account, tokenId, 1, "");
    }

    // =============================================================
    //                           PUBLIC FUNCTIONS
    // =============================================================

    /**
     * @dev Get Token URI for the badge
     *
     * @param tokenId  token Id of the badge for which URI to be fetched
     */
    function uri(
        uint256 tokenId
    )
        public
        view
        virtual
        override(ERC1155URIStorageUpgradeable, ERC1155Upgradeable)
        returns (string memory)
    {
        return ERC1155URIStorageUpgradeable.uri(tokenId);
    }

    // =============================================================
    //                           INTERNAL FUNCTIONS
    // =============================================================

    /**
     * @dev _beforeTokenTransfer -  implements the function from a Superior Contract
     *
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
		internal
		virtual
		override
		onlyOwner
	{}
}
