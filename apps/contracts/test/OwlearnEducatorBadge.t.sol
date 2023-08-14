// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/Proxy/EducatorBadgeProxy.sol";

contract OwlearnEducatorBadgeScript is Test {
    OwlearnEducatorBadge public owlearnEducatorBadge;
    address public bob = address(0x2);

    function setUp() public {
        address owlearnEducatorBadgeAddress = address(new OwlearnEducatorBadge());
        bytes memory initData = abi.encodeWithSelector(owlearnEducatorBadge.initialize.selector, "");
        owlearnEducatorBadge = OwlearnEducatorBadge(address(new EducatorBadgeProxy(owlearnEducatorBadgeAddress, initData)));
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

    function testUpdradeable() public {
        // address(this) is the owner
        address newOwlearnEducatorBadge = address(new OwlearnEducatorBadge());
        owlearnEducatorBadge.upgradeTo(newOwlearnEducatorBadge);
    }

    function testUpgradeFailOnNonOwner() public {
        // bob is not the owner
        startHoax(bob);
        // upgrade Factory
        address newOwlearnEducatorBadge = address(new OwlearnEducatorBadge());
        vm.expectRevert("Ownable: caller is not the owner");
        owlearnEducatorBadge.upgradeTo(newOwlearnEducatorBadge);
    }
}
