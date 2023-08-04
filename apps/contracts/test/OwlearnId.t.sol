// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
// import "forge-std/Console.sol";

import "../src/OwlearnId/OwlearnId.sol";

contract OwnlearnIdScript is Test {
    OwlearnId public owlearnId;

    function setUp() public {
        owlearnId = new OwlearnId("owl");
    }

    function testRegister() public {
        address alice = address(0x1);
        startHoax(alice, 100e18);

        uint amount = owlearnId.price("Dhruv");

        owlearnId.register{value: amount}("Dhruv");

        assertEq(owlearnId.getNameRecordFromAddress(alice), "Dhruv");
        OwlearnId.Record memory record = owlearnId.getNameRecord("Dhruv");

        assertEq(owlearnId.ownerOf(record.tokenId), alice);
    }

    function testNFTMetadata() public {
        address alice = address(0x1);
        startHoax(alice, 100e18);

        uint amount = owlearnId.price("Dhruv");

        owlearnId.register{value: amount}("Dhruv");
        OwlearnId.Record memory record = owlearnId.getNameRecord("Dhruv");
        string memory metadata = owlearnId.tokenURI(record.tokenId);

        console.log(metadata);
    }
}
