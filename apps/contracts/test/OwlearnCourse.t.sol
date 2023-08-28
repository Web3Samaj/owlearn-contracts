// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/Factory/CourseFactory.sol";
import "../src/Proxy/FactoryProxy.sol";
import "../src/Proxy/CourseProxy.sol";
import "../src/OwlearnCourse/OwlearnCourse.sol";
import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/Factory/CourseFactory.sol";
import "../src/OwlearnCourse/Resources/OwlearnCourseResources.sol";
import "../src/OwlearnCourse/Certificates/OwlearnCourseCertificates.sol";
import "../src/modules/Registery/OwlearnModuleRegistery.sol";
import "../src/modules/ModuleExample/FreeModule.sol";
import "../src/Implementation/ImplementationRegistery.sol";

contract OwlearnCourseScript is Test {
    address public manager = address(0x0);
    // owner =  alice
    address public alice = address(0x1);
    address public john = address(0x2);
    address public clay = address(0x3);
    address public module;
    OwlearnCourse public owlearnCourse;
    OwlearnCourseCertificates public owlearnCourseCertificates;
    OwlearnCourseResources public owlearnCourseResources;
    ImplementationRegistery public implRegistery;

    string[] public nftURIs;
    string[] public newNFTURIs;

    function setUp() public {
        nftURIs.push("s1");
        nftURIs.push("s2");
        newNFTURIs.push("s3");
        newNFTURIs.push("s4");
        OwlearnCourseResources resourceImplementation = new OwlearnCourseResources();
        OwlearnCourseCertificates certificateImplementation = new OwlearnCourseCertificates();
        address owlearnCourseImplementation = address(new OwlearnCourse());
        OwlearnEducatorBadge owlearnEducatorBadge = new OwlearnEducatorBadge();
        OwlearnCourseFactory courseFactoryImplementation = new OwlearnCourseFactory();
        implRegistery = new ImplementationRegistery();
        implRegistery.initialise();

        // deploy the registery
        OwlearnModuleRegistery moduleRegistery = new OwlearnModuleRegistery();
        // Initialise
        moduleRegistery.initialise();

        // setup factory for ModuleBase

        bytes memory factoryInitCode = abi.encodeWithSelector(
            OwlearnCourseFactory.initialize.selector,
            owlearnEducatorBadge,
            address(owlearnCourse),
            address(resourceImplementation),
            address(certificateImplementation),
            address(moduleRegistery),
            address(implRegistery)
        );

        OwlearnCourseFactory courseFactory = OwlearnCourseFactory(
            address(
                new FactoryProxy(
                    address(courseFactoryImplementation),
                    factoryInitCode
                )
            )
        );

        // Deploying the Module
        FreeModule freeModule = new FreeModule(address(courseFactory));
        module = address(freeModule);

        // then the module is whitelisted
        moduleRegistery.whitelistModule(address(freeModule));

        // deploy the course
        bytes memory courseInitCode = abi.encodeWithSelector(
            OwlearnCourse.initialize.selector,
            1,
            1,
            "Python Beginner",
            "PB",
            address(this), // this contract is the Owner, as it is the one which deploys the contracts
            "s",
            nftURIs,
            "c",
            address(resourceImplementation),
            address(certificateImplementation),
            moduleRegistery,
            address(implRegistery)
        );
        owlearnCourse = OwlearnCourse(
            address(
                new CourseProxy(owlearnCourseImplementation, courseInitCode)
            )
        );
        owlearnCourseCertificates = owlearnCourse.courseCertificates();
        owlearnCourseResources = owlearnCourse.courseResources();
    }

    function testConstructor() public {
        _consoleNeededInfo();
        assertNotEq(address(owlearnCourseCertificates), address(0));
        assertNotEq(address(owlearnCourseResources), address(0));
        assertEq(owlearnCourseResources.balanceOf(address(this)), 2);
        assertEq(owlearnCourseResources.tokenURI(0), "s1");
        assertEq(owlearnCourseResources.tokenURI(1), "s2");
    }

    // Mint new NFTs for the Course, only callable by Course
    function testMintNewCourseNFTs() public {
        owlearnCourse.mintCourseNFTs(newNFTURIs);
        assertEq(owlearnCourseResources.balanceOf(address(this)), 4);
        assertEq(owlearnCourseResources.tokenURI(2), "s3");
        assertEq(owlearnCourseResources.tokenURI(3), "s4");
    }

    // Any external call to the function would fail
    function testFailCourseMintNewCourseNFTs() public {
        startHoax(alice, 1e18);
        owlearnCourse.mintCourseNFTs(newNFTURIs);
    }

    function testEditCourseNFTs() public {
        owlearnCourse.editCourseNFT(1, "s11");
        assertEq(owlearnCourseResources.tokenURI(1), "s11");
    }

    // First need approval for the NFT to the Course Contract to delete it
    function testDeleteCourseNFTs() public {
        owlearnCourseResources.approve(address(owlearnCourse), 1);
        owlearnCourse.deleteCourseNFT(1);
        assertEq(owlearnCourseResources.balanceOf(address(this)), 1);
    }

    // Direct deletion of NFTs via course would fail
    function testFailDeleteCourseNFTs() public {
        startHoax(alice, 1e18);
        owlearnCourseResources.deleteCourseNFT(1);
    }

    function testMintCertificates() public {
        owlearnCourse.mintCourseCertificate(alice, "");
        assertEq(owlearnCourseCertificates.balanceOf(alice), 1);
    }

    function _consoleNeededInfo() internal view {
        console.log(address(owlearnCourseCertificates));
        console.log(address(owlearnCourseResources));
        console.log(owlearnCourseCertificates.name());
        console.log(owlearnCourseCertificates.symbol());
        console.log(owlearnCourseResources.name());
        console.log(owlearnCourseResources.symbol());
    }

    // update
    function testUpdradeable() public {
        // upgrade course
        address newCourse = address(new OwlearnCourse());
        implRegistery.whitelistCourseImplm(newCourse);
        owlearnCourse.upgradeTo(newCourse);

        // upgrade resources
        address newResources = address(new OwlearnCourseResources());
        implRegistery.whitelistResourceImplm(newResources);
        owlearnCourseResources.upgradeTo(newResources);

        // upgrade certificates
        address newCertificates = address(new OwlearnCourseCertificates());
        implRegistery.whitelistCertificateImplm(newCertificates);
        owlearnCourseCertificates.upgradeTo(newCertificates);
    }

    // update
    function testFailUpgradeOnNonOwner() public {
        // upgrade course
        address newCourse = address(new OwlearnCourse());
        implRegistery.whitelistCourseImplm(newCourse);

        // upgrade resources
        address newResources = address(new OwlearnCourseResources());
        implRegistery.whitelistResourceImplm(newResources);

        // upgrade certificates
        address newCertificates = address(new OwlearnCourseCertificates());
        implRegistery.whitelistResourceImplm(newCertificates);

        startHoax(alice);
        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourse.upgradeToAndCall(newCourse, "");

        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseResources.upgradeToAndCall(newResources, "");

        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseCertificates.upgradeToAndCall(newCertificates, "");
    }

    // update
    function testFailUpgradeOnNonApproved() public {
        // upgrade course
        address newCourse = address(new OwlearnCourse());

        // upgrade resources
        address newResources = address(new OwlearnCourseResources());

        // upgrade certificates
        address newCertificates = address(new OwlearnCourseCertificates());

        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourse.upgradeToAndCall(newCourse, "");

        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseResources.upgradeToAndCall(newResources, "");

        // vm.expectRevert("Ownable: caller is not the owner");
        owlearnCourseCertificates.upgradeToAndCall(newCertificates, "");
    }

    function testSetModule() public {
        bytes memory data;
        owlearnCourse.setAndInitialiseMintModule(module, data);
    }

    function testFailSetModuleNonOwner() public {
        startHoax(alice);
        bytes memory data;
        owlearnCourse.setAndInitialiseMintModule(module, data);
    }

    function testFailSetModuleNotWhitelisted() public {
        address extraModule = address(0x6);
        bytes memory data;
        owlearnCourse.setAndInitialiseMintModule(extraModule, data);
    }
}
