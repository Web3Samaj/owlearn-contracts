// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnCourseCerticates} from "./Certificates/OwlearnCourseCertificates.sol";
import {OwlearnCourseResources} from "./Resources/OwlearnCourseResources.sol";

abstract contract OwlearnCourseStorage {
    /*======================== Initialised Certificates & Resources contract ========================*/

    OwlearnCourseCerticates public courseCertificates;

    OwlearnCourseResources public courseResources;

    /*======================== State Variables ========================*/

    address public mintModule;
    uint public creatorId;
    uint public courseId;


    // adding a gap variable to allow future upgrades
    uint256[50] private __gap;
}