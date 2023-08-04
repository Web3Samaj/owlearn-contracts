// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/OwlearnCourse/Certificates/OwlearnCourseCertificates.sol";

contract OwlearnCourseCertificatesScript is Test {
    // manager =  address(0)
    // owner =  alice
    address public alice = address(0x1);
    address public clay = address(0x3);
    uint public tokenId;
    OwlearnCourseCertificates public owlearnCourseCertificates;

    function setUp() public {
        owlearnCourseCertificates = new OwlearnCourseCertificates(
            "OwlCerti",
            "OCT",
            "",
            alice
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
}
