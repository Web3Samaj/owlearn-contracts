// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "../OwlearnId/OwlearnId.sol";
import "../Factory/CourseFactory.sol";
import "../OwlearnCourse/OwlearnCourse.sol";
import "./OwlearnMasterStorage.sol";
import "../EducatorBadge/OwlearnEducatorBadge.sol";

/// @title OwlearnMaster
/// @notice Master Router Contract for Owlearn Protocol to route Contract calls & emit events
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
// Contracts to Cover (Only which have interaction with an external User)
// Course Factory
// Owlearn Course
// OwlearnId
contract OwlearnMaster is OwlearnMasterStorage {
    constructor(
        address _owlearnIdAddress,
        address _courseFactoryAddress,
        address _educatorBadgeAddress
    ) {
        owlearnId = OwlearnId(_owlearnIdAddress);
        courseFactory = OwlearnCourseFactory(_courseFactoryAddress);
        educatorBadge = OwlearnEducatorBadge(_educatorBadgeAddress);
    }

    /*======================== OwlearnID Functions ========================*/
    // --> Create a New Owlearn Id for the user and log the user data in event

    function createNewOwlearnId(
        string memory _userName,
        string memory _userDataURI
    ) public payable returns (uint owlId) {
        owlId = owlearnId.register{value: msg.value}(_userName);
        users[msg.sender] = UserData(owlId, false);
        // emit an Event
    }

    /*======================== OwlearnID Functions ========================*/
    // --> Register as a educator after a educator Badge is minted with creator info and log this data Too

    function registerAsEducator() public {
        // Check if the person owns a badge before
        // check if the person is already registered
        users[msg.sender].isEducator = true;
        // log event with detail
    }

    /*======================== Factory Functions ========================*/
    // --> Create a New Owlearn Course and log course Data in event

    function createCourse() public returns (address course) {
        // only educator
        (address course, uint courseId) = courseFactory.createCourse(
            creatorId,
            courseName,
            courseSymbol,
            courseURI,
            courseNFTURIs,
            certificateBaseURI
        );
        // Store Course Data
        // log Event
    }

    /*======================== Owlearn Course Functions ========================*/
    // --> Mint new Course Lecture , edit or delete  old , log the video info in the events
    // --> Mint new user certificate for enrolling in the course , and log who enrolled in which course
}
