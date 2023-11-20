// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {OwlearnModuleRegisteryStorage} from "./OwlearnModuleRegisteryStorage.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwlearnModuleBase} from "../Base/OwlearnModuleBase.sol";
import {ModuleProxy} from "../../Proxy/ModuleProxy.sol";

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
     * @dev Update/Set the Owlearn Course Factory contracts
     *
     * @param _factory - factory Address
     */
    function setFactory(address _factory) external onlyOwner {
        factory = _factory;
    }

    /**
     * @dev Whitelist a new module Implementation
     * @notice Only Allowed for Owner
     *
     * @param _implementationAddress module address
     */
    function whitelistModuleImplementation(
        address _implementationAddress
    ) public onlyOwner {
        getWhitelistedModuleImplementation[_implementationAddress] = true;
    }

    /**
     * @dev create a New module proxy
     * @notice Only Whitelisted Implementation
     *
     * @param _implementationAddress module address
     */
    function createModuleProxy(
        address _implementationAddress
    ) public returns (address moduleProxy) {
        require(
            getWhitelistedModuleImplementation[_implementationAddress],
            "ONLY WHITELISTED MODULE IMPLEMENTATION ALLOWED"
        );

        // Module initialiser
        bytes memory moduleInitCode = abi.encodeWithSelector(
            OwlearnModuleBase.initialize.selector,
            factory
        );

        //  Deploy new Proxy for the implementation
        moduleProxy = address(
            new ModuleProxy(_implementationAddress, moduleInitCode)
        );

        //  Whitelist the new proxy
        _whitelistModule(moduleProxy);
    }

    /**
     * @dev Whitelist a new module contract
     * @notice Only internal ,whitelisted when a module proxy is created
     *
     * @param _moduleAddress module address
     */
    function _whitelistModule(address _moduleAddress) internal {
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
