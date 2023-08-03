// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title OwlearnCourseResources
/// @notice ERC721A NFT Contract responsible for course resources
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnCourseResources is ERC721A, Ownable {
    // =============================================================
    //                           STORAGE
    // =============================================================

    string public courseDetailsURI;
    address public owlearnCourse;

    /*========================  URI Storage variable ======================== */

    using Strings for uint256;
    mapping(uint256 => string) private _tokenURIs;
    string public baseURI = "";

    /*========================  Events ======================== */

    event MetadataUpdate(uint tokenId, string tokenURI);
    event CourseInitialised(
        string courseName,
        string courseSymbol,
        address creator
    );
    event NewCourseResourceMinted(
        uint totalResourceMinted,
        string[] courseURIs
    );
    event CourseResourceBurned(uint tokenId);
    event CourseResourceUpdated(uint tokenId, string newResourceURI);

    /*======================== Constructor Functions ========================*/

    /**
     * @dev Intialise the course by minting the new NFTs for the course first
     *
     * @param courseName  Name of the Course , will also be the name of NFT Collection
     * @param courseSymbol  Symbol of the Course , will be the symbol of NFT Collection
     * @param courseCreator  creator of the Course , who will also control the Collection
     * @param courseURI  courseURI , containing any extra course Info , not to be stored on-chain
     * @param courseNFTURIs  courseNFTURIs to be minted , containing info about the particular resource
     * @param courseAddress Owlearn Course Main Contract, just to add the the onlyCourse Modifier
     */
    constructor(
        string memory courseName,
        string memory courseSymbol,
        address courseCreator,
        string memory courseURI,
        string[] memory courseNFTURIs,
        address courseAddress
    ) ERC721A(courseName, courseSymbol) {
        transferOwnership(courseCreator);
        courseDetailsURI = courseURI;
        _initialiseCourse(courseCreator, courseNFTURIs);
        owlearnCourse = courseAddress;
        emit CourseInitialised(courseName, courseSymbol, courseCreator);
    }

    /*======================== Modifier Functions ========================*/

    modifier onlyCourse() {
        require(_msgSender() == owlearnCourse, "ONLY COURSE CONTRACT");
        _;
    }

    // =============================================================
    //                           EXTNERNAL FUNCTIONS
    // =============================================================

    /**
     * @dev mint new Course NFTs , after it is intialised once
     *
     * @param courseNFTURIs  courseNFTURIs to be minted , containing info about the particular resource
     */
    function mintCourseNFTs(string[] memory courseNFTURIs) external onlyCourse {
        // it starts from currentIndex & mint NFTs from this ownward
        _mintandSetURI(owner(), courseNFTURIs);
    }

    /**
     * @dev edit a single NFT , just changing the Contents and it's URI
     *
     * @param tokenId  tokenId of the NFT for which resource is to be updated
     * @param newNFTURI  new & updated NFT URI containing info about the particular resource
     */
    function editCourseNFT(
        uint tokenId,
        string memory newNFTURI
    ) external onlyCourse {
        _setTokenURI(tokenId, newNFTURI);

        emit CourseResourceUpdated(tokenId, newNFTURI);
    }

    /**
     * @dev delete the Course NFT  ,with the tokenID , directly
     *
     * @param tokenId  tokenId of the NFT for which resource is to be deleted
     */
    function deleteCourseNFT(uint tokenId) external onlyCourse {
        _burn(tokenId);

        emit CourseResourceBurned(tokenId);
    }

    /**
     * @dev  Set a  New Course URI for the course incase any info changes
     * @dev  Default value set in constructor
     *
     * @param _uri New Base URI to be set
     */
    function setCourseURI(string memory _uri) external onlyOwner {
        courseDetailsURI = _uri;
    }

    // =============================================================
    //                           INTERNAL FUNCTIONS
    // =============================================================

    /**
     * @dev Intialise the course by minting the new NFTs for the course first
     *
     * @param courseNFTURIs  courseNFTURIs to be minted , containing info about the particular resource
     */
    function _initialiseCourse(
        address courseCreator,
        string[] memory courseNFTURIs
    ) internal {
        // mint the initial NFTs
        _mintandSetURI(courseCreator, courseNFTURIs);
    }

    /**
     * @dev mint new Course NFTs along with setting URIs for each NFT
     *
     * @param to  address to which the new Resource are to be minted
     * @param tokenURIs  tokenURIs of the new NFTs to be minted , whatever URIs will be there , a single NFT wi be minted for each and URI will be set
     */
    function _mintandSetURI(
        address to,
        string[] memory tokenURIs
    ) internal virtual {
        uint totalTokensBefore = totalSupply();
        uint tokenURILength = tokenURIs.length;

        _mint(to, tokenURILength);

        for (uint i = 0; i < tokenURILength; i++) {
            _setTokenURI(i + totalTokensBefore, tokenURIs[i]);
        }

        emit NewCourseResourceMinted(tokenURILength, tokenURIs);
        // another option top directly point the newTokenURI in the _tokenURIs
    }

    /**
     * @dev  Burn a NFT by transferring to a 0 address along with deleting the NFT URI for same
     *
     * @param tokenId  tokenId to be burned
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId, true);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    /**
     * @dev  Set a Token URI for a NFT
     *
     * @param tokenId  tokenId to be set
     * @param _tokenURI  URI for the Token ID
     */
    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        require(_exists(tokenId), "URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;

        emit MetadataUpdate(tokenId, _tokenURI);
    }

    /**
     * @dev  Set a base URI for the NFT collection if needed
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /*======================== Overidden Token URI Functions ========================*/

    /**
     * @dev  Get Token URI for a Token , fetched for getting the info for the resources
     * @dev  If there is no base URI, return the token URI.
     * @dev  If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
     * @dev  Or Just return the blank baseURI using the method suggested by ERC721A
     * @param tokenId  tokenId  for each URI is to be fetched
     */
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

    /**
     * @dev  Set a base URI for the NFT collection if needed
     * @dev  If base URI is set , then the result of tokenURI, will be a concat string of baseURI + tokenURI we set
     * @dev  Default value set to ""
     *
     * @param _uri New Base URI to be set
     */
    function setBaseURI(string memory _uri) external onlyOwner {
        baseURI = _uri;
    }
}
