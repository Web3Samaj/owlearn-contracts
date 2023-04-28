// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/src/Test.sol";

import "../src/OwlearnId.sol";

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

        assertEq(owlearnId.getAddress("Dhruv"), alice);
    }
}
