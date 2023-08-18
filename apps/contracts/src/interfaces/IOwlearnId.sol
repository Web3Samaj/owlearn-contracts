// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.12;

interface IOwlearnId {
    struct Record {
        string domain;
        address user;
        uint256 tokenId; // recordId
    }

    function price(string calldata name) external pure returns (uint256 amount);

    function register(
        string calldata name
    ) external payable returns (uint recordID);

    function getNameRecord(
        string calldata name
    ) external view returns (Record memory);

    function getNameRecordFromAddress(
        address user
    ) external view returns (Record memory);

    function withdraw() external;
}
