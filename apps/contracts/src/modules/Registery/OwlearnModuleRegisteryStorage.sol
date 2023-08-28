// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

/// @title OwlearnModuleRegistery
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
abstract contract OwlearnModuleRegisteryStorage {
    /*///////////////////// Mappings //////////////////////////////////*/
    mapping(address => bool) public getWhitelistedModules;
}
