// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// Source : https://github.com/Web3Samaj/owlearn-contracts/blob/5-feat-coursefactory/apps/contracts/src/CourseFactory.sol

import {OwlearnEducatorBadge} from "../EducatorBadge/OwlearnEducatorBadge.sol";

/// @title CourseFactoryStorage
/// @notice The Storage contract for OwlearnID
/// @author Dhruv <contact.dhruvagarwal@gmail.com>

contract CourseFactoryStorage {
    /*///////////////////// Mappings & Variables //////////////////////////////////*/

    struct CourseCreationProps {
        string courseName;
        string courseSymbol;
        address courseCreator;
        string courseURI;
        string[] courseNFTURIs;
        string certificateBaseURI;
    }

    mapping(uint => address) public getCourse;
    uint public totalCourses;
    address[] public allCourses;
    address public courseImplementation;
    address public resourceImplementation;
    address public certificateImplementation;
    OwlearnEducatorBadge public educateBadgeNFT;

    // adding a gap variable to allow future upgrades
    uint256[50] private __gap;
}
