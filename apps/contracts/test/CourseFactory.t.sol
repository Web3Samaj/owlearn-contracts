// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/Factory/CourseFactory.sol";
import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/modules/Registery/OwlearnModuleRegistery.sol";
import "../src/OwlearnCourse/OwlearnCourse.sol";
import "../src/OwlearnCourse/Certificates/OwlearnCourseCertificates.sol";
import "../src/OwlearnCourse/Resources/OwlearnCourseResources.sol";
import "../src/Proxy/CourseProxy.sol";
import "../src/Proxy/FactoryProxy.sol";
import "../src/Implementation/ImplementationRegistery.sol";

contract CourseFactoryScript is Test {
    OwlearnCourseFactory public courseFactory;
    string[] public nftURIs;
    // owner =  alice
    address public alice = address(0x1);
    address public module = address(0x5);

    function setUp() public {
        OwlearnEducatorBadge owlearnEducatorBadge = new OwlearnEducatorBadge();
        OwlearnCourse owlearnCourse = new OwlearnCourse();
        OwlearnCourseResources resourceImplementation = new OwlearnCourseResources();
        OwlearnCourseCertificates certificateImplementation = new OwlearnCourseCertificates();
        OwlearnModuleRegistery moduleRegistery = new OwlearnModuleRegistery();
        ImplementationRegistery implRegistery = new ImplementationRegistery();

        owlearnEducatorBadge.initialize("", address(0));
        owlearnEducatorBadge.mintEducatorBadges(alice, 1);
        address courseFactoryImplementation = address(
            new OwlearnCourseFactory()
        );
        bytes memory factoryInitCode = abi.encodeWithSelector(
            OwlearnCourseFactory.initialize.selector,
            owlearnEducatorBadge,
            address(owlearnCourse),
            address(resourceImplementation),
            address(certificateImplementation),
            address(moduleRegistery),
            address(implRegistery)
        );

        courseFactory = OwlearnCourseFactory(
            address(
                new FactoryProxy(courseFactoryImplementation, factoryInitCode)
            )
        );
    }

    function testCreateCourse() public {
        startHoax(alice, 1e18);
        nftURIs.push("s1");
        nftURIs.push("s2");
        (address course, uint courseId) = courseFactory.createCourse(
            1,
            "Python Beginners",
            "PB",
            "s",
            nftURIs,
            "c"
        );
        console.log(course);
        console.log(courseId);

        OwlearnCourse owlearnCourse = OwlearnCourse(course);
        console.log(address(owlearnCourse.courseCertificates()));
        console.log(address(owlearnCourse.courseResources()));

        assertEq(courseFactory.getCourse(courseId), course);
    }

    function testCourseIsProxy() public {
        startHoax(alice, 1e18);
        nftURIs.push("s1");
        nftURIs.push("s2");
        (address course, uint256 courseId) = courseFactory.createCourse(
            1,
            "Python Beginners",
            "PB",
            "s",
            nftURIs,
            "c"
        );
        assert(
            keccak256(course.code) == keccak256(type(CourseProxy).runtimeCode)
        );
    }

    function testFailCreatecourse() public {
        nftURIs.push("s1");
        nftURIs.push("s2");
        (address course, uint256 courseId) = courseFactory.createCourse(
            1,
            "Python Beginners",
            "PB",
            "s",
            nftURIs,
            "c"
        );
    }

    function testUpdradeable() public {
        address newFactory = address(new OwlearnCourseFactory());
        courseFactory.upgradeTo(newFactory);
    }

    function testUpgradeFailOnNonOwner() public {
        startHoax(alice);
        // upgrade Factory
        address newFactory = address(new OwlearnCourseFactory());
        vm.expectRevert("Ownable: caller is not the owner");
        courseFactory.upgradeTo(newFactory);
    }
}
