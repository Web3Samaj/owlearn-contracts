// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OwlearnCourseResource is ERC721A {
    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;

    event MetadataUpdate(uint tokenId, string tokenURI);

    constructor(
        string memory courseName,
        string memory courseSymbol
    ) ERC721A(courseName, courseSymbol) {}

    function _mintandSetURI(
        address to,
        uint256 quantity,
        string[] memory tokenURIs
    ) internal virtual {
        _mint(to, quantity);

        uint tokenURILength = tokenURIs.length;
        require(tokenURILength == quantity, "URI INPUT MISMATCH");

        for (uint i = 0; i < tokenURILength; i++) {
            _setTokenURI(i, tokenURIs[i]);
        }

        // another option top directly point the newTokenURI in the _tokenURIs
    }

    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId, true);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        require(_exists(tokenId), "URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;

        emit MetadataUpdate(tokenId, _tokenURI);
    }

    // To mint the Inital few Course NFTs
    function initialiseCourse(uint256 quantity) external {
        // mint the initial NFTs
    }

    // After intialisation , Mint new Courses
    function mintCourseNFTs(uint256 quantity) external {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
    }
}
