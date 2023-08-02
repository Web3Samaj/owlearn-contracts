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

    uint256 public constant THREE_LETTER_MULTIPLIER = 10;
    uint256 public constant FOUR_LETTER_MULTIPLIER = 5;
    uint256 public constant PRICE_MULTIPLIER = 3;

    /*///////////////////// Errors //////////////////////////////////*/
    error Unauthorized();
    error AlreadyRegistered();
    error InvalidName(string name);

    /*///////////////////// Events //////////////////////////////////*/

    event OwlIdRegistered(address user, string name, uint tokenId);

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
     * @param _username domain Name to mint
     * @return amount amount to be paid for minting
     */
    function price(string calldata _username) public pure returns (uint256 amount) {
        uint256 len = StringUtils.strlen(_username);

        if (len == 0) revert InvalidName(_username);

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
     * @param _username domain Name to mint
     * @return recordID amount to be paid for minting
     */
    function register(
        string calldata _username
    ) public payable returns (uint recordID) {
        if (domainNames[_username].user != address(0)) revert AlreadyRegistered();

        // fetching the price and check
        uint256 _price = price(_username);
        require(msg.value >= _price, "NOT ENOUGH MATIC PAID");

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
        string memory strLen = Strings.toString(length);
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
