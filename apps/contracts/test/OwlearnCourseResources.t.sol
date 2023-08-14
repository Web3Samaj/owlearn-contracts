// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/OwlearnCourse/Resources/OwlearnCourseResources.sol";
import "../src/Proxy/ResourceProxy.sol";

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
        address owlearnCourseResourcesAddress = address(new OwlearnCourseResources());
        bytes memory initData = abi.encodeWithSelector(owlearnCourseResources.initialize.selector, 
            "Python Beginner",
            "PB",
            alice,
            "s",
            nftURIs,
            address(this));
        owlearnCourseResources = OwlearnCourseResources(address(new ResourceProxy(owlearnCourseResourcesAddress, initData)));
    }

    function testConstructor() public {
        assertEq(owlearnCourseResources.balanceOf(alice), 2);
        assertEq(owlearnCourseResources.tokenURI(0), "s1");
        assertEq(owlearnCourseResources.tokenURI(1), "s2");
    }

    // Mint new NFTs for the Course, only callable by Course
    function testMintNewCourseNFTs() public {
        owlearnCourseResources.mintCourseNFTs(newNFTURIs);
        assertEq(owlearnCourseResources.balanceOf(alice), 4);
        assertEq(owlearnCourseResources.tokenURI(2), "s3");
        assertEq(owlearnCourseResources.tokenURI(3), "s4");
    }

    // Any external call to the function would fail
    function testFailCourseMintNewCourseNFTs() public {
        startHoax(alice, 1e18);
        owlearnCourseResources.mintCourseNFTs(newNFTURIs);
    }

    function testEditCourseNFTs() public {
        owlearnCourseResources.editCourseNFT(1, "s11");
        assertEq(owlearnCourseResources.tokenURI(1), "s11");
    }

    // Direct deletion of NFTs via course would fail
    function testFailDeleteCourseNFTs() public {
        owlearnCourseResources.deleteCourseNFT(1);
        assertEq(owlearnCourseResources.balanceOf(alice), 1);
        console.log(owlearnCourseResources.tokenURI(1));
    }

    // First need approval for the NFT to the Course Contract to delete it
    function testDeleteCourseNFTs() public {
        vm.startPrank(alice);
        owlearnCourseResources.approve(address(owlearnCourseResources), 1);
        owlearnCourseResources.approve(address(this), 1);
        vm.stopPrank();
        owlearnCourseResources.deleteCourseNFT(1);
        assertEq(owlearnCourseResources.balanceOf(alice), 1);
    }

    function testSetBaseURI() public {
        startHoax(alice, 1e18);
        owlearnCourseResources.setBaseURI("s0");
        assertEq(owlearnCourseResources.baseURI(), "s0");
    }

    function testSetCourseURI() public {
        startHoax(alice, 1e18);
        assertEq(owlearnCourseResources.courseDetailsURI(), "s");
        owlearnCourseResources.setCourseURI("s00");
        assertEq(owlearnCourseResources.courseDetailsURI(), "s00");
    }

    function testUpdradeable() public {
        // alice is the owner
        startHoax(alice);
        address newOwlearnCourseResources = address(new OwlearnCourseResources());
        owlearnCourseResources.upgradeTo(newOwlearnCourseResources);
    }

    function testUpgradeFailOnNonOwner() public {
        // address(this) is not the owner
        // upgrade Factory
        address newOwlearnCourseResources = address(new OwlearnCourseResources());
        vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseResources.upgradeTo(newOwlearnCourseResources);
    }
}
