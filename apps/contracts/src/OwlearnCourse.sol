// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract OwlearnCourse is
    ERC1155URIStorage,
    Ownable,
    ERC1155Burnable,
    ERC1155Supply
{
    string private _token0URI;
    string private _token1URI;

    constructor(string memory token0URI, string memory token1URI) ERC1155("") {
        _token0URI = token0URI;
        _token1URI = token1URI;

        // Setting the URI in constructor for fixed
        _setURI(0, _token0URI);
        _setURI(1, _token1URI);
    }

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

    function mintCourseEnrollement(address account) public {
        /// tokenID 0 minted for Enrollement badges
        _mint(account, 0, 1, bytes(""));
    }

    function mintCourseBadges(address account) public {
        // _mint(account, , amount, data);
        // _setURI(tokenId, nftURI);
    }

    function mintCourseNFTs(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

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
