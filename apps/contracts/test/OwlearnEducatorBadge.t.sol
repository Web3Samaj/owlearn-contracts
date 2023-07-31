// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/OwlearnEducatorBadge.sol";

contract OwlearnEducatorBadgeScript is Test {
    OwlearnEducatorBadge public owlearnEducatorBadge;

    function setUp() public {
        owlearnEducatorBadge = new OwlearnEducatorBadge("");
    }

    function testFailDirectMint() public {
        address alice = address(0x1);
        startHoax(alice, 10e18);

        owlearnEducatorBadge.mintEducatorBadges(alice, 1);
    }

    function testOwnerMint() public {
        address alice = address(0x1);
        owlearnEducatorBadge.mintEducatorBadges(alice, 1);

        assertEq(owlearnEducatorBadge.balanceOf(alice, 1), 1);
    }

    function testFailExternalURISet() public {
        address alice = address(0x1);
        startHoax(alice, 1e18);

        owlearnEducatorBadge.setURI(2, "");
    }
}
