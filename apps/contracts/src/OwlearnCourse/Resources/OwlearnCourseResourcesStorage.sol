// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {ImplementationRegistery} from "../../Implementation/ImplementationRegistery.sol";

abstract contract OwlearnCourseResourcesStorage {
    // =============================================================
    //                           STORAGE
    // =============================================================
    ImplementationRegistery public implRegistery;

    string public courseDetailsURI;
    address public owlearnCourse;

    /*========================  URI Storage variable ======================== */
    mapping(uint256 => string) internal _tokenURIs;
    string public baseURI = "";

    // adding a gap variable to allow future upgrades
    uint256[50] private __gap;
}
