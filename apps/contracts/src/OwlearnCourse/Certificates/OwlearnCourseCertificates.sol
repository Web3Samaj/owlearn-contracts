// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnCourseCertificatesStorage, CountersUpgradeable} from "./OwlearnCourseCerticatesStorage.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ImplementationRegistery} from "../../Implementation/ImplementationRegistery.sol";

/// @title OwlearnCourseCertificates
/// @notice ERC721 NFT Contract responsible for course certificates with Dynamic URI
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnCourseCertificates is
    ERC721Upgradeable,
    OwnableUpgradeable,
    OwlearnCourseCertificatesStorage,
    UUPSUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    event CourseCertificateIntialised(
        string courseCertificateName,
        string courseCertificateSymbol,
        string certificateBaseURI
    );
    event CertificateURIUpdated(string newBaseURI);
    event CertificateMinted(address to, uint tokenID);
    event CertificateBurned(uint tokenId);

    /*///////////////////// Constructor //////////////////////////////////*/
    /**
     * @dev Lock implementation contract
     */
    constructor() {
        // disabling initialisation of implementation contract to prevent attacks
        // _disableInitializers();
    }

    /*======================== Initializer Functions ========================*/
    /**
     * @dev Intialise the Course Certificate Contracts
     *
     * @param courseCertificateName  Name of the Course Certificate, will also be the name of NFT Collection
     * @param courseCertificateSymbol  Symbol of the Course Certificate, will be the symbol of NFT Collection
     * @param certificateBaseURI  NFT URI , dynamic , off-chain server link , fetching progree & certificates for a Course Learner
     * @param courseCreator  creator of the Course , who will also control the Collection
     * @param implmRegisteryAddress implm Registery for the Owlearn Protocol , only set by courseFactory
     */
    function initialize(
        string memory courseCertificateName,
        string memory courseCertificateSymbol,
        string memory certificateBaseURI,
        address courseCreator,
        address implmRegisteryAddress
    ) external payable initializer {
        __ERC721_init(courseCertificateName, courseCertificateSymbol);
        __Ownable_init();
        baseURI = certificateBaseURI;
        manager = msg.sender;
        _transferOwnership(courseCreator);
        implRegistery = ImplementationRegistery(implmRegisteryAddress);
        emit CourseCertificateIntialised(
            courseCertificateName,
            courseCertificateSymbol,
            certificateBaseURI
        );
    }

    /*======================== Modifier Functions ========================*/
    modifier onlyManager() {
        require(msg.sender == manager, "ONLY MANAGER AUTHORISED");
        _;
    }
    modifier onlyApprovedImplementation(address newImplementation) {
        require(
            implRegistery.getWhitelistedCertificateImplementation(
                newImplementation
            ),
            "IMPLEMENETATION NOT APPROVED"
        );
        _;
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
        emit CertificateURIUpdated(newURI);
    }

    /**
     * @dev  Safe Mint a Certificate to a learner
     *
     * @dev Another restrictions could be added like a fees
     * Minted by a manager , or need to be whitelisted
     * restricted to manager for now , as the safeMint will be called from the OwlearnCourse.sol
     * @param to  Address to which NFT is to be minted
     */
    function safeMint(address to) public onlyManager returns (uint) {
        _tokenIdCounter.increment();

        // token Id Starts from 1
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        emit CertificateMinted(to, tokenId);
        return tokenId;
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
        emit CertificateBurned(tokenId);
    }

    /**
     * @dev  Revoke a Certificate NFT , in Case of issues
     *
     * @param tokenId tokenID to be minted
     */
    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
        emit CertificateBurned(tokenId);
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

    function _authorizeUpgrade(
        address newImplementation
    )
        internal
        virtual
        override
        onlyApprovedImplementation(newImplementation)
        onlyOwner
    {}
}
