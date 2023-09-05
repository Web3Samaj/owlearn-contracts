// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {OwlearnModuleRegisteryStorage} from "./OwlearnModuleRegisteryStorage.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title OwlearnModuleRegistery
/// @notice Module registery responsible for keeping track on whitelisted Modules
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract OwlearnModuleRegistery is
    OwnableUpgradeable,
    OwlearnModuleRegisteryStorage,
    UUPSUpgradeable
{
    /*///////////////////// Constructor //////////////////////////////////*/
    /**
     * @dev Lock implementation contract
     */
    constructor() {
        // disabling initialisation of implementation contract to prevent attacks
        // _disableInitializers();
    }

    /*///////////////////// Public functions //////////////////////////////////*/

    /**
     * @dev for initialising the contract with Ownable
     *
     */
    function initialise() external payable initializer {
        // initialise ownable contract
        __Ownable_init();
    }

    /**
     * @dev Whitelist a new module contract
     * @notice Only Allowed for Owner
     *
     * @param _moduleAddress module address
     */
    function whitelistModule(address _moduleAddress) public onlyOwner {
        getWhitelistedModules[_moduleAddress] = true;
    }

    /**
     * @dev Disable a module contract at any point
     * @notice Only Allowed for Owner
     *
     * @param _moduleAddress  module addressß
     */
    function disableModule(address _moduleAddress) public onlyOwner {
        getWhitelistedModules[_moduleAddress] = false;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}
}
