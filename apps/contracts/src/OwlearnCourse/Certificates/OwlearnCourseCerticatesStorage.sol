// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

abstract contract OwlearnCourseCertificatesStorage {
    // =============================================================
    //                           STORAGE
    // =============================================================
    CountersUpgradeable.Counter internal _tokenIdCounter;

    string public baseURI;

    address public manager;

    // adding a gap variable to allow future upgrades
    uint256[50] private __gap;
}
