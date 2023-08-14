// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
// import "forge-std/Console.sol";

import "../src/OwlearnId/OwlearnId.sol";
import "../src/Proxy/OwlearnIdProxy.sol";

contract OwnlearnIdScript is Test {
    OwlearnId public owlearnId;
    address public bob = address(0x2);

    function setUp() public {
        address owlearnIdAddress = address(new OwlearnId());
        bytes memory initData = abi.encodeWithSelector(owlearnId.initialize.selector,"owl");
        owlearnId = OwlearnId(address(new OwlearnIdProxy(owlearnIdAddress, initData)));
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

    function testUpdradeable() public {
        // address(this) is the owner
        address newOwlearnId = address(new OwlearnId());
        owlearnId.upgradeTo(newOwlearnId);
    }

    function testUpgradeFailOnNonOwner() public {
        // bob is not the owner
        startHoax(bob);
        // upgrade Factory
        address newOwlearnId = address(new OwlearnId());
        vm.expectRevert("Ownable: caller is not the owner");
        owlearnId.upgradeTo(newOwlearnId);
    }
}
