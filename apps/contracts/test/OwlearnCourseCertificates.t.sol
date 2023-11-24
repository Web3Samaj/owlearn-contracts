// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/OwlearnCourse/Certificates/OwlearnCourseCertificates.sol";
import "../src/Proxy/CertificateProxy.sol";
import "../src/Implementation/ImplementationRegistery.sol";

contract OwlearnCourseCertificatesScript is Test {
    // manager =  address(0)
    // owner =  alice
    address public alice = address(0x1);
    address public clay = address(0x3);
    uint public tokenId;
    OwlearnCourseCertificates public owlearnCourseCertificates;
    ImplementationRegistery public implRegistery;

    function setUp() public {
        address owlearnCourseCertificatesAddress = address(
            new OwlearnCourseCertificates()
        );
        implRegistery = new ImplementationRegistery();
        implRegistery.initialize();

        bytes memory initData = abi.encodeWithSelector(
            owlearnCourseCertificates.initialize.selector,
            "OwlCerti",
            "OCT",
            "",
            alice,
            address(implRegistery)
        );
        owlearnCourseCertificates = OwlearnCourseCertificates(
            address(
                new CertificateProxy(owlearnCourseCertificatesAddress, initData)
            )
        );
        tokenId = owlearnCourseCertificates.safeMint(clay);
    }

    function testFailDirectMint() public {
        startHoax(clay, 10e18);
        owlearnCourseCertificates.safeMint(clay);
    }

    // for SBT Token  , No transfer Allowed
    function testFailTransfer() public {
        startHoax(clay, 1e18);

        address john = address(0);
        owlearnCourseCertificates.transferFrom(clay, john, tokenId);
    }

    function testBurn() public {
        startHoax(clay, 1e18);
        owlearnCourseCertificates.burn(tokenId);
    }

    function testRevoke() public {
        assertEq(owlearnCourseCertificates.ownerOf(tokenId), clay);
        startHoax(alice, 1e18);
        owlearnCourseCertificates.revoke(tokenId);
        assertEq(owlearnCourseCertificates.balanceOf(clay), 0);
    }

    function testUpdradeable() public {
        // alice is the owner
        address newOwlearnCourseCertificates = address(
            new OwlearnCourseCertificates()
        );
        implRegistery.whitelistCertificateImplm(newOwlearnCourseCertificates);

        startHoax(alice);

        owlearnCourseCertificates.upgradeTo(newOwlearnCourseCertificates);
    }

    function testFailUpgradeOnNonOwner() public {
        // address(this) is not the owner
        // upgrade Factory
        address newOwlearnCourseCertificates = address(
            new OwlearnCourseCertificates()
        );
        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseCertificates.upgradeTo(newOwlearnCourseCertificates);
    }

    function testFailUpgradeOnNotApproved() public {
        startHoax(alice);

        // upgrade Factory
        address newOwlearnCourseCertificates = address(
            new OwlearnCourseCertificates()
        );
        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseCertificates.upgradeTo(newOwlearnCourseCertificates);
    }
}
