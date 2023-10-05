// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// import "forge-std/Console.sol";

import "../src/OwlearnId/OwlearnId.sol";
import "../src/Proxy/OwlearnIdProxy.sol";

contract OwnlearnIdScript is Test {
    OwlearnId public owlearnId;
    address public bob = address(0x2);
    address public lensHub = address(0x5);
    bytes32 _allowListmerkleRoot =
        0x3b3fde3b18438281dfe0cc075df6d2043365f063ec0dd04495f530ca2c4dddee;
    bytes32 _blackListmerkleRoot =
        0x3b3fde3b18438281dfe0cc075df6d2043365f063ec0dd04495f530ca2c4dddee;

    bytes32[] _allowListProof = [
        bytes32(
            0xc35d9b60a22fca9000cd06fe54e5d6519a32e41da6a9770879b110c77dcdcc4d
        ),
        bytes32(
            0xa99577c71e008deea13754ac5a02091816fb7bdb67cae06b2a1071d303a09951
        ),
        bytes32(
            0xeabc706638072e691ae28a7c390574fea15d4c88d208362bba45d232235356fd
        )
    ];

    bytes32[] _userNameProof = [bytes32(0), bytes32(0), bytes32(0)];

    function setUp() public {
        address owlearnIdAddress = address(new OwlearnId());
        bytes memory initData = abi.encodeWithSelector(
            owlearnId.initialize.selector,
            "owl",
            lensHub,
            _allowListmerkleRoot,
            _blackListmerkleRoot
        );
        owlearnId = OwlearnId(
            address(new OwlearnIdProxy(owlearnIdAddress, initData))
        );
    }

    function testRegister() public {
        address alice = address(0x62C43323447899acb61C18181e34168903E033Bf);
        startHoax(alice, 100e18);

        // uint amount = owlearnId.getPrice("Dhruv", alice);
        uint amount = 1 ether;

        owlearnId.registerOwlId{value: amount}(
            "Dhruv",
            _allowListProof,
            _userNameProof
        );

        assertEq(owlearnId.getNameRecordFromAddress(alice), "Dhruv");
        OwlearnId.Record memory record = owlearnId.getNameRecord("Dhruv");

        assertEq(owlearnId.ownerOf(record.tokenId), alice);
    }

    function testNFTMetadata() public {
        address alice = address(0x62C43323447899acb61C18181e34168903E033Bf);
        startHoax(alice, 100e18);

        // uint amount = owlearnId.getPrice("Dhruv", alice);
        uint amount = 1 ether;

        owlearnId.registerOwlId{value: amount}(
            "Dhruv",
            _allowListProof,
            _userNameProof
        );
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
