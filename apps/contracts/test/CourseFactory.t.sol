// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/Factory/CourseFactory.sol";
import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/OwlearnCourse/OwlearnCourse.sol";

contract CourseFactoryScript is Test {
    OwlearnCourseFactory public courseFactory;
    string[] public nftURIs;
    address public alice = address(0x1);

    function setUp() public {
        OwlearnEducatorBadge owlearnEducatorBadge = new OwlearnEducatorBadge(
            ""
        );
        owlearnEducatorBadge.mintEducatorBadges(alice, 1);
        courseFactory = new OwlearnCourseFactory(owlearnEducatorBadge);
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

    function testFailCreatecourse() public {
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
    }
}
