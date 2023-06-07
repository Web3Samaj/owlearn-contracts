// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import {OwlearnIdStorage} from "./storage/OwlearnIdStorage.sol";
import {StringUtils} from "./libraries/StringUtils.sol";
import {Base64} from "./libraries/Base64.sol";
import {IOwlearnId} from "./interfaces/IOwlearnId.sol";

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

    // domain extension ->  .owl
    string public tld;

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
        require(len > 0);
        if (len == 3) {
            return 10 * 10 ** 15; // 10 Matic for len 3
        } else if (len == 4) {
            return 5 * 10 ** 15; // 5 Matic for len 4
        } else {
            return 3 * 10 ** 15; // 3 Matic for len 5
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
        require(domainNames[name].user == address(0));
        require(domainRecords[msg.sender].user == address(0));

        // fetching the price and check
        uint256 _price = price(name);
        require(msg.value >= _price, "Not Enough Matic paid");

        // Combine the name passed into the function  with the TLD
        string memory _name = string(abi.encodePacked(name, ".", tld));

        // Create the SVG (image) for the NFT with the name
        string memory finalSvg = string(
            abi.encodePacked(svgPartOne, _name, svgPartTwo)
        );
        uint256 newRecordId = _tokenIds.current();
        uint256 length = StringUtils.strlen(name);
        string memory strLen = Strings.toString(length);

        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            name,
            tld,
            newRecordId
        );

        // Create the JSON metadata of our NFT. We do this by combining strings and encoding as base64
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                _name,
                '", "description": "A domain on the Owlearn", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(finalSvg)),
                '","length":"',
                strLen,
                '"}'
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log(
            "\n--------------------------------------------------------"
        );
        console.log("Final tokenURI", finalTokenUri);
        console.log(
            "--------------------------------------------------------\n"
        );

        _safeMint(msg.sender, newRecordId);
        _setTokenURI(newRecordId, finalTokenUri);
        Record memory _record = Record({
            domain: name,
            user: msg.sender,
            tokenId: newRecordId
        });

        domainRecords[msg.sender] = _record;
        domainNames[name] = _record;
        _tokenIds.increment();
        return newRecordId;
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
     * @return Record domain Name record
     */
    function getNameRecordFromAddress(
        address user
    ) public view returns (Record memory) {
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
