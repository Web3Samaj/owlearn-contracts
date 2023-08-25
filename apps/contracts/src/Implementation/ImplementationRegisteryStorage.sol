// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

/// @title ImplementationRegisteryStorage
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
abstract contract ImplementationRegisteryStorage {
    /*///////////////////// Mappings //////////////////////////////////*/
    mapping(address => bool) public getWhitelistedCourseImplementation;
    mapping(address => bool) public getWhitelistedResourceImplementation;
    mapping(address => bool) public getWhitelistedCertificateImplementation;
}
