// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// From https://github.com/Web3Samaj/owlearn-contracts/blob/3-feat-owlearn-id-for-users/apps/contracts/src/OwlearnId.sol

import {OwlearnIdStorage} from "./OwlearnIdStorage.sol";
import {ILensHub} from "../interfaces/ILensHub.sol";
import {StringUtils} from "@ensdomains/ens-contracts/contracts/ethregistrar/StringUtils.sol";
import {Base64Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol";
import {MerkleProofUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import {IOwlearnId} from "../interfaces/IOwlearnId.sol";

import "forge-std/console.sol";

import {ERC721URIStorageUpgradeable, StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title OwlearnID
/// @notice A namespace NFT contract that mints unique user handles.
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnId is
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    OwlearnIdStorage,
    UUPSUpgradeable
{
    // for tracking of tokenIds
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    /*///////////////////// Constants //////////////////////////////////*/

    uint256 public constant ONE_LETTER_MULTIPLIER = 50;
    uint256 public constant TWO_LETTER_MULTIPLIER = 25;
    uint256 public constant THREE_LETTER_MULTIPLIER = 10;
    uint256 public constant FOUR_LETTER_MULTIPLIER = 5;
    uint256 public constant PRICE_MULTIPLIER = 1;

    /*///////////////////// Errors //////////////////////////////////*/
    error notAllowlisted();
    error usernameBlackListed();
    error Unauthorized();
    error AlreadyRegistered();
    error InvalidName(string name);

    /*///////////////////// Events //////////////////////////////////*/

    event OwlIdRegistered(address user, string name, uint tokenId);

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
     * @dev The constructor sets NFT Implementation and the TLD
     *
     * @param _tld the domain name extension
     */
    function initialize(
        string memory _tld,
        address _lensHub,
        bytes32 _allowListmerkleRoot,
        bytes32 _blackListNameMerkleRoot
    ) external payable initializer {
        __ERC721_init("Owlearn Id", "OWLID");
        __Ownable_init();
        tld = _tld;
        _svgPartOne = '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#B)" d="M0 0h270v270H0z"/><defs><filter id="A" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><path d="M72.863 42.949c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-10.081 6.032-6.85 3.934-10.081 6.032c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-8.013-4.721a4.52 4.52 0 0 1-1.589-1.616c-.384-.665-.594-1.418-.608-2.187v-9.31c-.013-.775.185-1.538.572-2.208a4.25 4.25 0 0 1 1.625-1.595l7.884-4.59c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v6.032l6.85-4.065v-6.032c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595L41.456 24.59c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-14.864 8.655a4.25 4.25 0 0 0-1.625 1.595c-.387.67-.585 1.434-.572 2.208v17.441c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l10.081-5.901 6.85-4.065 10.081-5.901c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v9.311c.013.775-.185 1.538-.572 2.208a4.25 4.25 0 0 1-1.625 1.595l-7.884 4.721c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-7.884-4.59a4.52 4.52 0 0 1-1.589-1.616c-.385-.665-.594-1.418-.608-2.187v-6.032l-6.85 4.065v6.032c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l14.864-8.655c.657-.394 1.204-.95 1.589-1.616s.594-1.418.609-2.187V55.538c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595l-14.993-8.786z" fill="#fff"/><defs><linearGradient id="B" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#cb5eee"/><stop offset="1" stop-color="#0cd7e4" stop-opacity=".99"/></linearGradient></defs><text x="32.5" y="231" font-size="27" fill="#fff" filter="url(#A)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
        _svgPartTwo = "</text></svg>";
        lensHub = ILensHub(_lensHub);
        allowlistMerkleRoot = _allowListmerkleRoot;
        blackListNameMerkleRoot = _blackListNameMerkleRoot;
        isAllowListEnabled = true;
        isBlackListEnabled = true;
        console.log("%s name service deployed ", _tld);
    }

    /*///////////////////////////////////////////////////////////////
                           Modifier
    //////////////////////////////////////////////////////////////*/

    // modifier

    /*///////////////////////////////////////////////////////////////
                           Functions
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev to get the Price for minting a new domain
     *
     * @param _username domain Name to mint
     * @return amount amount to be paid for minting
     */
    function getPrice(
        string calldata _username,
        address user
    ) public view returns (uint256) {
        uint256 len = StringUtils.strlen(_username);
        uint amount;
        if (len == 0) {
            revert InvalidName(_username);
        } else if (len == 1) {
            amount = ONE_LETTER_MULTIPLIER * 1 ether; // 50 Matic for len 1
        } else if (len == 2) {
            amount = TWO_LETTER_MULTIPLIER * 1 ether; // 25 Matic for len 2
        } else if (len == 3) {
            amount = THREE_LETTER_MULTIPLIER * 1 ether; // 10 Matic for len 3
        } else if (len == 4) {
            amount = FOUR_LETTER_MULTIPLIER * 1 ether; // 5 Matic for len 4
        } else {
            amount = PRICE_MULTIPLIER * 1 ether; // 1 Matic for len 5
        }

        bool isEligibleForDiscount = checkLensHandle(user);

        if (isEligibleForDiscount) {
            return (amount / 2);
        } else {
            return amount;
        }
    }

    /**
     * @dev checks if the user if allowed to Mint from the allowlist
     *
     * @param proof proof for the verification
     * @param user user address
     * @return isAllowed if the user is allowed
     */
    function checkAllowlist(
        bytes32[] calldata proof,
        address user
    ) public view returns (bool isAllowed) {
        bytes32 leaf = keccak256(abi.encode(user));
        isAllowed = MerkleProofUpgradeable.verify(
            proof,
            allowlistMerkleRoot,
            leaf
        );
    }

    function checkBlackListName(
        bytes32[] calldata proof,
        string calldata _username
    ) public view returns (bool isAllowed) {
        bytes32 leaf = keccak256(abi.encode(_username));
        isAllowed = MerkleProofUpgradeable.verify(
            proof,
            blackListNameMerkleRoot,
            leaf
        );
    }

    /**
     * @dev to check if the handle is eligible
     *
     * @param _username domain Name to mint
     * @return isEligible if the username is eligible
     */
    function checkHandle(
        string calldata _username
    ) public view returns (bool isEligible) {
        isEligible = domainNames[_username].user != address(0) ? false : true;
    }

    /**
     * @dev check if the user owns a lens handle
     *
     * @param user user address
     * @return ownsLensHandle if the user owns any lens handle
     */
    function checkLensHandle(
        address user
    ) public view returns (bool ownsLensHandle) {
        if (address(lensHub) != address(0)) {
            uint balance = lensHub.balanceOf(user);
            ownsLensHandle = balance >= 1 ? true : false;
        } else {
            return false;
        }
    }

    /**
     * @dev to get the Price for minting a new domain
     * @notice Payable function to send the price for minting the domain
     * @param _username domain Name to mint
     * @return recordID amount to be paid for minting
     */
    function registerOwlId(
        string calldata _username,
        bytes32[] calldata allowListProof,
        bytes32[] calldata blackListProof
    ) public payable returns (uint recordID) {
        if (isAllowListEnabled) {
            // Checking AllowList
            if (!checkAllowlist(allowListProof, msg.sender))
                revert notAllowlisted();
        }

        if (isBlackListEnabled) {
            // Checking BlackList
            if (checkBlackListName(blackListProof, _username))
                revert usernameBlackListed();
        }

        // check if the handle is available
        if (!checkHandle(_username)) revert AlreadyRegistered();

        if (isFeeEnabled) {
            // fetching the price and check if the user has paid
            uint256 _price = getPrice(_username, msg.sender);
            require(msg.value >= _price, "NOT ENOUGH MATIC PAID");
        }

        string memory finalSvg = _getSVG(_username);

        uint256 newRecordId = _tokenIds.current();

        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            _username,
            tld,
            newRecordId
        );

        string memory finalTokenUri = _getMetadata(_username, finalSvg);

        console.log(
            "\n--------------------------------------------------------"
        );
        console.log("Final tokenURI", finalTokenUri);
        console.log(
            "--------------------------------------------------------\n"
        );

        // Minting the NFT
        _safeMint(msg.sender, newRecordId);

        // Set the Token URI
        _setTokenURI(newRecordId, finalTokenUri);

        // Prepare the recordData
        Record memory _record = Record({
            domain: _username,
            user: msg.sender,
            tokenId: newRecordId
        });

        // Store the Recors in the mapping
        domainRecords[msg.sender] = _username;
        domainNames[_username] = _record;

        // Incrementing the TokenId for NFT
        _tokenIds.increment();

        emit OwlIdRegistered(msg.sender, _username, newRecordId);

        return newRecordId;
    }

    function registerRestrictedNames(
        address to,
        string calldata _username,
        bytes32[] calldata proof
    ) public payable onlyOwner returns (uint recordID) {
        if (isBlackListEnabled) {
            if (!checkBlackListName(proof, _username))
                revert usernameBlackListed();
        }

        // check if the handle is available
        if (!checkHandle(_username)) revert AlreadyRegistered();

        if (isFeeEnabled) {
            // fetching the price and check if the user has paid
            uint256 _price = getPrice(_username, msg.sender);
            require(msg.value >= _price, "NOT ENOUGH MATIC PAID");
        }
        string memory finalSvg = _getSVG(_username);

        // Incrementing the TokenId for NFT
        _tokenIds.increment();
        uint256 newRecordId = _tokenIds.current();

        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            _username,
            tld,
            newRecordId
        );

        string memory finalTokenUri = _getMetadata(_username, finalSvg);

        console.log(
            "\n--------------------------------------------------------"
        );
        console.log("Final tokenURI", finalTokenUri);
        console.log(
            "--------------------------------------------------------\n"
        );

        // Minting the NFT
        _safeMint(to, newRecordId);

        // Set the Token URI
        _setTokenURI(newRecordId, finalTokenUri);

        // Prepare the recordData
        Record memory _record = Record({
            domain: _username,
            user: to,
            tokenId: newRecordId
        });

        // Store the Recors in the mapping
        domainRecords[to] = _username;
        domainNames[_username] = _record;

        emit OwlIdRegistered(to, _username, newRecordId);

        return newRecordId;
    }

    /**
     * @dev to get the Price for minting a new domain
     *
     * @param _username domain Name to mint
     * @return finalSvg final SVG of the Custom Domain Image for the NFT
     */
    function _getSVG(
        string calldata _username
    ) internal view returns (string memory finalSvg) {
        // Combine the name passed into the function  with the TLD
        string memory _name = string(abi.encodePacked(_username, ".", tld));

        // Create the SVG (image) for the NFT with the name
        finalSvg = string(abi.encodePacked(_svgPartOne, _name, _svgPartTwo));
    }

    /**
     * @dev to get the Price for minting a new domain
     *
     * @param _username domain Name to mint
     * @param finalSvg the Svg string for the NFT image
     * @return finalTokenUri Token URI of the NFT to be minted
     */
    function _getMetadata(
        string calldata _username,
        string memory finalSvg
    ) internal view returns (string memory finalTokenUri) {
        uint256 length = StringUtils.strlen(_username);
        string memory strLen = StringsUpgradeable.toString(length);
        string memory _name = string(abi.encodePacked(_username, ".", tld));

        string memory json = Base64Upgradeable.encode(
            abi.encodePacked(
                '{"name": "',
                _name,
                '", "description": "A domain on the Owlearn", "image": "data:image/svg+xml;base64,',
                Base64Upgradeable.encode(bytes(finalSvg)),
                '","length":"',
                strLen,
                '"}'
            )
        );
        // Create the JSON metadata of our NFT. We do this by combining strings and encoding as base64

        finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
    }

    /**
     * @dev get the name record
     *
     * @param _username domain Name to fetch for
     * @return Record domain Name record
     */
    function getNameRecord(
        string calldata _username
    ) public view returns (Record memory) {
        return domainNames[_username];
    }

    /**
     * @dev get the name record from Address
     *
     * @param user domain Name to fetch for
     * @return recordId domain Name record Id
     */
    function getNameRecordFromAddress(
        address user
    ) public view returns (string memory) {
        return domainRecords[user];
    }

    /*======================== Owner Functions ========================*/

    /**
     * @dev withdraw the funds collected
     * @notice restricted only for the owner
     */
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = owner().call{value: amount}("");
        require(success, "Failed to withdraw Matic");
    }

    /**
     * @dev update the allowlistMerkleRoot to add new addresses to the allowlist
     * @notice restricted only for the owner
     * @param _allowListmerkleRoot The updated merkle Root
     */
    function updateAllowlistMerkleRoot(
        bytes32 _allowListmerkleRoot
    ) public onlyOwner {
        allowlistMerkleRoot = _allowListmerkleRoot;
    }

    /**
     * @dev update the blackListNameMerkleRoot to add new names to the blacklist
     * @notice restricted only for the owner
     * @param _blackListNameMerkleRoot The updated merkle Root
     */
    function updateBlacklistNameMerkleRoot(
        bytes32 _blackListNameMerkleRoot
    ) public onlyOwner {
        blackListNameMerkleRoot = _blackListNameMerkleRoot;
    }

    /**
     * @dev update the isFeeEnabled to switch the fees on or Off
     * @notice restricted only for the owner
     * @param _isFeeEnabled The switch status : TRUE or FALSE
     */
    function switchIsFeeEnabled(bool _isFeeEnabled) public onlyOwner {
        isFeeEnabled = _isFeeEnabled;
    }

    /**
     * @dev update the isAllowListEnabled to switch the Allowlist method on or Off
     * @notice restricted only for the owner
     * @param _isAllowListEnabled The switch status : TRUE or FALSE
     */
    function switchIsAllowlistEnabled(
        bool _isAllowListEnabled
    ) public onlyOwner {
        isAllowListEnabled = _isAllowListEnabled;
    }

    /**
     * @dev update the isBlackListEnabled to switch the fees on or Off
     * @notice restricted only for the owner
     * @param _isBlackListEnabled The switch status : TRUE or FALSE
     */
    function switchIsBlackListEnabled(
        bool _isBlackListEnabled
    ) public onlyOwner {
        isBlackListEnabled = _isBlackListEnabled;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}
}
