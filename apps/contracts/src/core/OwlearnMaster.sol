// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "../Factory/CourseFactory.sol";
import "../OwlearnCourse/OwlearnCourse.sol";
import "../OwlearnId/OwlearnId.sol";

/// @title OwlearnMaster
/// @notice Master Router Contract for Owlearn Protocol to route Contract calls & emit events
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
// Contracts to Cover (Only which have interaction with an external User)
// Course Factory
// Owlearn Course
// OwlearnId
contract OwlearnMaster {
    /*======================== OwlearnID Functions ========================*/
    // --> Create a New Owlearn Id for the user and log the user data in event
    /*======================== Factory Functions ========================*/
    // --> Create a New Owlearn Course and log course Data in event
    /*======================== Owlearn Course Functions ========================*/
    // --> Mint new Course Lecture , edit or delete  old , log the video info in the events
    // --> Mint new user certificate for enrolling in the course , and log who enrolled in which course
}
