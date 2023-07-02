// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title OwlearnCourseCerticates
/// @notice ERC721 NFT Contract responsible for course certificates with Dynamic URI
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnCourseCerticates is ERC721, Ownable {
    // =============================================================
    //                           STORAGE
    // =============================================================
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string public baseURI;

    /*======================== Event Functions ========================*/

    event NftMinted(address indexed to, uint256 indexed tokenId);
    event NftBurned(address indexed to, uint256 indexed tokenId);

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
    /**
     * @dev  Set a base URI for the NFT collection if needed
     *
     * @param newURI New Base URI to be set
     */
    function setBaseURI(string memory newURI) external onlyOwner {
        baseURI = newURI;
    }

    /**
     * @dev  Safe Mint a Certificate to a learner
     *
     * Minted by a manager , or need to be whitelisted
     * @param to  Address to which NFT is to be minted
     */
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    /**
     * @dev  burn an NFT
     *
     * @param tokenId tokenID to be minted
     */
    function burn(uint256 tokenId) public virtual {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner or approved"
        );
        _burn(tokenId);
    }

    /**
     * @dev  Revoke a Certificate NFT , in Case of issues
     *
     * @param tokenId tokenID to be minted
     */
    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    // =============================================================
    //                           INTERNAL FUNCTIONS
    // =============================================================

    /**
     * @dev  base URI returned , Overriden
     *
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /*======================== SBT Functions ========================*/

    /**
     * @dev _beforeTokenTransfer Limit the transfer to just mint or burn , no transfers are allowed , making it a Soul Bound Token
     *
     */
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

    /**
     * @dev _afterTokenTransfer add events to define when a NFT is minted or Revoked
     *
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        if (from == address(0)) {
            emit NftMinted(to, tokenId);
        } else if (to == address(0)) {
            emit NftBurned(to, tokenId);
        }
    }
}
