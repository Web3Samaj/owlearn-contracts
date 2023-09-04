// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "../OwlearnId/OwlearnId.sol";
import "../Factory/CourseFactory.sol";
import "../OwlearnCourse/OwlearnCourse.sol";
import "../EducatorBadge/OwlearnEducatorBadge.sol";

/// @title OwlearnMasterStorage
/// @notice The Storage contract for Owlearn Master
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
//
abstract contract OwlearnMasterStorage {
    OwlearnId public owlearnId;
    OwlearnCourseFactory public courseFactory;
    OwlearnEducatorBadge public educatorBadge;

    struct CourseData {
        address course;
        address owner;
    }

    struct UserData {
        uint owlId;
        bool isEducator;
    }

    // courseId => Course Data
    mapping(uint => CourseData) public courseById;

    // OwlId  =>  UserData
    mapping(address => UserData) public users;
}
