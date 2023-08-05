// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnCourseCertificates} from "./Certificates/OwlearnCourseCertificates.sol";
import {OwlearnCourseResources} from "./Resources/OwlearnCourseResources.sol";

abstract contract OwlearnCourseStorage {
    /*======================== Initialised Certificates & Resources contract ========================*/

    OwlearnCourseCertificates public courseCertificates;

    OwlearnCourseResources public courseResources;

    /*======================== State Variables ========================*/

    address public mintModule;
    uint public creatorId;
    uint public courseId;

    // adding a gap variable to allow future upgrades
    uint256[50] private __gap;
}
