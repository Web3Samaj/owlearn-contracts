// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/OwlearnId/OwlearnId.sol";
import "../src/Proxy/EducatorBadgeProxy.sol";

contract OwlearnEducatorBadgeScript is Test {
    OwlearnEducatorBadge public owlearnEducatorBadge;
    OwlearnId public owlearnID;
    address public bob = address(0x2);
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

    address _lensHub = address(0x5);

    function setUp() public {
        owlearnID = new OwlearnId();
        owlearnID.initialize(
            "owl",
            _lensHub,
            _allowListmerkleRoot,
            _blackListmerkleRoot
        );

        address owlearnEducatorBadgeAddress = address(
            new OwlearnEducatorBadge()
        );
        bytes memory initData = abi.encodeWithSelector(
            owlearnEducatorBadge.initialize.selector,
            "",
            address(owlearnID)
        );
        owlearnEducatorBadge = OwlearnEducatorBadge(
            address(
                new EducatorBadgeProxy(owlearnEducatorBadgeAddress, initData)
            )
        );
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

    function testRegister() public {
        address alice = address(0x62C43323447899acb61C18181e34168903E033Bf);
        owlearnEducatorBadge.mintEducatorBadges(alice, 1);

        startHoax(alice, 10e18);
        uint amount = owlearnID.getPrice("Alice", alice);

        uint owlId = owlearnID.registerOwlId{value: amount}(
            "Alice",
            _allowListProof,
            _userNameProof
        );
        owlearnEducatorBadge.registerAsEducator(owlId);
    }

    function testFailRegisterOnNoBadge() public {
        address alice = address(0x62C43323447899acb61C18181e34168903E033Bf);
        startHoax(alice, 10e18);
        uint amount = owlearnID.getPrice("Alice", alice);

        uint owlId = owlearnID.registerOwlId{value: amount}(
            "Alice",
            _allowListProof,
            _userNameProof
        );
        owlearnEducatorBadge.registerAsEducator(owlId);
    }

    function testFailRegisterOnNonIdOwner() public {
        address alice = address(0x62C43323447899acb61C18181e34168903E033Bf);
        owlearnEducatorBadge.mintEducatorBadges(alice, 1);

        startHoax(alice, 10e18);
        uint amount = owlearnID.getPrice("Alice", alice);

        uint owlId = owlearnID.registerOwlId{value: amount}(
            "Alice",
            _allowListProof,
            _userNameProof
        );
        startHoax(bob, 10e18);
        owlearnEducatorBadge.registerAsEducator(owlId);
    }

    function testFailExternalURISet() public {
        address alice = address(0x1);
        startHoax(alice, 10e18);

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
