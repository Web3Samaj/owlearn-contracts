// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// From : https://github.com/Web3Samaj/owlearn-contracts/blob/3-feat-owlearn-id-for-users/apps/contracts/src/storage/OwlearnIdStorage.sol

/// @title OwlearnIdStorage
/// @notice The Storage contract for OwlearnID
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
abstract contract OwlearnIdStorage {
    /*///////////////////////////////////////////////////////////////
                           State Variables and mappings
    //////////////////////////////////////////////////////////////*/

    struct Record {
        string domain;
        address user;
        uint256 tokenId; // recordId
    }

    // address => recordId
    mapping(address => string) public domainRecords;

    // tokenId (name) => record
    mapping(string => Record) public domainNames;

    // domain extension ->  .owl
    string public tld;

    /*/////////////////////// NFT SVG  /////////////////////////////*/
    string _svgPartOne;
    string _svgPartTwo;

    // adding a gap variable to allow future upgrades
    uint256[50] private __gap;
}
