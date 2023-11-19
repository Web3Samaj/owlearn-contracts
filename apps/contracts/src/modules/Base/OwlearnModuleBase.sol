// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnModuleBaseStorage} from "./OwlearnModuleBaseStorage.sol";
import {IMintModule} from "../../interfaces/IMintModule.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IFactory {
    function getCourse(uint courseId) external returns (address course);
}

/// @title MintModuleBase
/// @notice Base Module Contract for Owlearn Mint Module
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// @notice Add Call restricitions , which contract can actually call these
abstract contract OwlearnModuleBase is
    IMintModule,
    OwlearnModuleBaseStorage,
    UUPSUpgradeable
{
    address public factory;

    /*======================== Constructor Functions ========================*/
    /**
     * @dev Lock implementation contract
     */
    constructor() {
        // disabling initialisation of implementation contract to prevent attacks
        _disableInitializers();
    }

    /**
     * @dev Initialize the Module
     *
     * @param _factory Factory contract Address
     */
    function initialize(address _factory) external initializer {
        require(_factory != address(0), "NOT A VALID PARAM");
        factory = _factory;
    }

    /*======================== Modifier Functions ========================*/
    /// It is upto the User to add modifier to their modules , as they have the freedom to modify it according to them
    /// But the modules can't be controlled by any entity
    /// The modules will be audited by the Owlearn Protocol before allowed in the whitelist

    modifier onlyCourses(uint courseId) {
        require(
            IFactory(factory).getCourse(courseId) == msg.sender,
            "ONLY AUTHORISED TO VALID COURSES"
        );
        _;
    }

    // No Upgradation Allowed Once the initialisation is done
    function _authorizeUpgrade(address) internal virtual override {
        revert();
    }
}
