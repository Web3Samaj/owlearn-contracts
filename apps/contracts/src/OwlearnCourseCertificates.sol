// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Will be an Soul Bound Token

contract OwlearnCourseCerticates is ERC721, Ownable {
    // =============================================================
    //                           STORAGE
    // =============================================================
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string public baseURI;

    /*======================== Event Functions ========================*/

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    /*======================== Constructor Functions ========================*/

    constructor(
        string memory courseCertificateName,
        string memory courseCertificateSymbol,
        string memory certificateBaseURI
    ) ERC721(courseCertificateName, courseCertificateSymbol) {
        baseURI = certificateBaseURI;
    }

    // =============================================================
    //                           EXTNERNAL FUNCTIONS
    // =============================================================

    function setBaseURI(string memory newURI) external onlyOwner {
        baseURI = newURI;
    }

    // Minted by a manager , or need to be whitelisted
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public virtual {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner or approved"
        );
        _burn(tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    // =============================================================
    //                           INTERNAL FUNCTIONS
    // =============================================================

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256,
        uint256
    ) internal pure override {
        require(
            to == address(0) || from == address(0),
            "The NFT is non transferrable"
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }
}
