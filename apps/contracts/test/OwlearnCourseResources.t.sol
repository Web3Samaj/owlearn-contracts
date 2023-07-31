// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/OwlearnCourseResources.sol";

contract OwlearnCourseResourcesScript is Test {
    address public manager = address(0x0);
    // owner =  alice
    address public alice = address(0x1);
    address public john = address(0x2);
    address public clay = address(0x3);
    uint public tokenId;
    OwlearnCourseResources public owlearnCourseResources;
    string[] public nftURIs;
    string[] public newNFTURIs;

    function setUp() public {
        nftURIs.push("s1");
        nftURIs.push("s2");
        newNFTURIs.push("s3");
        newNFTURIs.push("s4");
        owlearnCourseResources = new OwlearnCourseResources(
            "Python Beginner",
            "PB",
            alice,
            "s",
            nftURIs,
            msg.sender
        );
    }

    function testConstructor() public {
        assertEq(owlearnCourseResources.balanceOf(alice), 2);
        assertEq(owlearnCourseResources.tokenURI(0), "s1");
        assertEq(owlearnCourseResources.tokenURI(1), "s2");
    }

    function testCourseMintNewCourseNFTs() public {
        owlearnCourseResources.mintCourseNFTs(newNFTURIs);
        assertEq(owlearnCourseResources.balanceOf(alice), 4);
        assertEq(owlearnCourseResources.tokenURI(2), "s3");
        assertEq(owlearnCourseResources.tokenURI(3), "s4");
    }

    function testFailMintNewCourseNFTs() public {
        owlearnCourseResources.mintCourseNFTs(newNFTURIs);
    }
}
