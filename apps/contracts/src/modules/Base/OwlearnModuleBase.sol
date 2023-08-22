// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwlearnModuleBaseStorage} from "./OwlearnModuleBaseStorage.sol";
import {IMintModule} from "../../interfaces/IMintModule.sol";

interface IFactory {
    function getCourse(uint courseId) external returns (address course);
}

/// @title MintModuleBase
/// @notice Base Module Contract for Owlearn Mint Module
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
/// @notice Add Call restricitions , which contract can actually call these
abstract contract OwlearnModuleBase is IMintModule, OwlearnModuleBaseStorage {
    address public immutable FACTORY;

    /*======================== Constructor Functions ========================*/
    /// Constructor can be used to set few variables at the time of deploy
    // /**
    //  * For Upgradeable Modules , use initialize function instead of constructor
    //  * @dev Intialise the Module with basic contract Data Initialiser
    //  *
    //  * @param _course  Course Contract address for which the Module is minted for
    //  */
    // function initialize(address _course) external initializer {
    //     owlearnCourse = _course;
    // }

    constructor(address factory) {
        require(factory != address(0), "NOT A VALID PARAM");
        FACTORY = factory;
    }

    /*======================== Modifier Functions ========================*/
    /// It is upto the User to add modifier to their modules , as they have the freedom to modify it according to them
    /// But the modules can't be controlled by any entity
    /// The modules will be audited by the Owlearn Protocol before allowed in the whitelist

    modifier onlyCourses(uint courseId) {
        require(
            IFactory(FACTORY).getCourse(courseId) == msg.sender,
            "ONLY AUTHORISED TO VALID COURSES"
        );
        _;
    }

    /*======================== External Virtual Functions ========================*/
}
