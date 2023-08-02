// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// From https://github.com/Web3Samaj/owlearn-contracts/blob/3-feat-owlearn-id-for-users/apps/contracts/src/OwlearnId.sol

import {OwlearnIdStorage} from "./OwlearnIdStorage.sol";
import {StringUtils} from "@ensdomains/ens-contracts/contracts/ethregistrar/StringUtils.sol";
import {Base64Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol";
import {IOwlearnId} from "../interfaces/IOwlearnId.sol";

import "forge-std/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title OwlearnID
/// @notice A namespace NFT contract that mints unique user handles.
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnId is ERC721URIStorage, Ownable, OwlearnIdStorage {
    // for tracking of tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /*///////////////////// Constants //////////////////////////////////*/

    // domain extension ->  .owl
    string public tld;

    uint256 public constant THREE_LETTER_MULTIPLIER = 10;
    uint256 public constant FOUR_LETTER_MULTIPLIER = 5;
    uint256 public constant PRICE_MULTIPLIER = 3;

    /*///////////////////// Errors //////////////////////////////////*/
    error Unauthorized();
    error AlreadyRegistered();
    error InvalidName(string name);

    /*///////////////////// Events //////////////////////////////////*/

    event OwlIdRegistered(address user, string name, uint tokenId);

    /*/////////////////////// NFT SVG  /////////////////////////////*/
    string _svgPartOne =
        '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#B)" d="M0 0h270v270H0z"/><defs><filter id="A" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><path d="M72.863 42.949c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-10.081 6.032-6.85 3.934-10.081 6.032c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-8.013-4.721a4.52 4.52 0 0 1-1.589-1.616c-.384-.665-.594-1.418-.608-2.187v-9.31c-.013-.775.185-1.538.572-2.208a4.25 4.25 0 0 1 1.625-1.595l7.884-4.59c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v6.032l6.85-4.065v-6.032c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595L41.456 24.59c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-14.864 8.655a4.25 4.25 0 0 0-1.625 1.595c-.387.67-.585 1.434-.572 2.208v17.441c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l10.081-5.901 6.85-4.065 10.081-5.901c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v9.311c.013.775-.185 1.538-.572 2.208a4.25 4.25 0 0 1-1.625 1.595l-7.884 4.721c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-7.884-4.59a4.52 4.52 0 0 1-1.589-1.616c-.385-.665-.594-1.418-.608-2.187v-6.032l-6.85 4.065v6.032c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l14.864-8.655c.657-.394 1.204-.95 1.589-1.616s.594-1.418.609-2.187V55.538c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595l-14.993-8.786z" fill="#fff"/><defs><linearGradient id="B" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#cb5eee"/><stop offset="1" stop-color="#0cd7e4" stop-opacity=".99"/></linearGradient></defs><text x="32.5" y="231" font-size="27" fill="#fff" filter="url(#A)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
    string _svgPartTwo = "</text></svg>";

    /**
     * @dev The constructor sets NFT Implementation and the TLD
     *
     * @param _tld the domain name extension
     */
    constructor(string memory _tld) payable ERC721("Owlearn Id", "OWLID") {
        tld = _tld;
        console.log("%s name service deployed ", _tld);
    }

    /*///////////////////////////////////////////////////////////////
                           Functions
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev to get the Price for minting a new domain
     *
     * @param name domain Name to mint
     * @return amount amount to be paid for minting
     */
    function price(string calldata name) public pure returns (uint256 amount) {
        uint256 len = StringUtils.strlen(name);

        if (len == 0) revert InvalidName(name);

        if (len == 3) {
            return THREE_LETTER_MULTIPLIER * 1 ether; // 10 Matic for len 3
        } else if (len == 4) {
            return FOUR_LETTER_MULTIPLIER * 1 ether; // 5 Matic for len 4
        } else {
            return PRICE_MULTIPLIER * 1 ether; // 3 Matic for len 5
        }
    }

    /**
     * @dev to get the Price for minting a new domain
     * @notice Payable function to send the price for minting the domain
     * @param name domain Name to mint
     * @return recordID amount to be paid for minting
     */
    function register(
        string calldata name
    ) public payable returns (uint recordID) {
        if (domainNames[name].user != address(0)) revert AlreadyRegistered();

        // fetching the price and check
        uint256 _price = price(name);
        require(msg.value >= _price, "NOT ENOUGH MATIC PAID");

        string memory finalSvg = _getSVG(name);

        uint256 newRecordId = _tokenIds.current();

        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            name,
            tld,
            newRecordId
        );

        string memory finalTokenUri = _getMetadata(name, finalSvg);

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
            domain: name,
            user: msg.sender,
            tokenId: newRecordId
        });

        // Store the Recors in the mapping
        domainRecords[msg.sender] = name;
        domainNames[name] = _record;

        // Incrementing the TokenId for NFT
        _tokenIds.increment();

        emit OwlIdRegistered(msg.sender, name, newRecordId);

        return newRecordId;
    }

    /**
     * @dev to get the Price for minting a new domain
     *
     * @param name domain Name to mint
     * @return finalSvg final SVG of the Custom Domain Image for the NFT
     */
    function _getSVG(
        string calldata name
    ) internal view returns (string memory finalSvg) {
        // Combine the name passed into the function  with the TLD
        string memory _name = string(abi.encodePacked(name, ".", tld));

        // Create the SVG (image) for the NFT with the name
        finalSvg = string(abi.encodePacked(_svgPartOne, _name, _svgPartTwo));
    }

    /**
     * @dev to get the Price for minting a new domain
     *
     * @param name domain Name to mint
     * @param finalSvg the Svg string for the NFT image
     * @return finalTokenUri Token URI of the NFT to be minted
     */
    function _getMetadata(
        string calldata name,
        string memory finalSvg
    ) internal view returns (string memory finalTokenUri) {
        uint256 length = StringUtils.strlen(name);
        string memory strLen = Strings.toString(length);
        string memory _name = string(abi.encodePacked(name, ".", tld));

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
     * @param name domain Name to fetch for
     * @return Record domain Name record
     */
    function getNameRecord(
        string calldata name
    ) public view returns (Record memory) {
        return domainNames[name];
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

    /**
     * @dev withdraw the funds collected
     * @notice restricted only for the owner
     */
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = owner().call{value: amount}("");
        require(success, "Failed to withdraw Matic");
    }
}
