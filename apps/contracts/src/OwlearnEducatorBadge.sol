// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/// @title OwlearnEducatorBadge
/// @notice An ERC1155 Contract as an Educator badge to all the educators on the platform , along with the badge Levels
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// Basic Educator Badge - Id - 0
contract OwlearnEducatorBadge is
    ERC1155URIStorage,
    Ownable,
    ERC1155Burnable,
    ERC1155Supply
{
    /*======================== Constructor Functions ========================*/
    /**
     * @dev Intialise the Educator Badge NFT Collections
     *
     * @param token0URI  token URI of the Basic Educator badge id-0
     */
    constructor(string memory token0URI) ERC1155("") {
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
        override(ERC1155URIStorage, ERC1155)
        returns (string memory)
    {
        return ERC1155URIStorage.uri(tokenId);
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
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
