// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

/// @title OwlearnModuleRegistery
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
abstract contract OwlearnModuleRegisteryStorage {
    /*///////////////////// Mappings //////////////////////////////////*/
    mapping(address => bool) public getWhitelistedModules;

    // adding a gap variable to allow future upgrades
    mapping(address => bool) public getWhitelistedModuleImplementation;
    address public factory;
    uint256[48] private __gap;
}
