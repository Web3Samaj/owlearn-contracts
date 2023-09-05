// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ImplementationRegisteryStorage} from "./ImplementationRegisteryStorage.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title ImplementationRegistery
/// @notice Implementation registery responsible for keeping track on whitelisted Contract implementations
/// @author Dhruv <contact.dhruvagarwal@gmail.com>
contract ImplementationRegistery is
    OwnableUpgradeable,
    ImplementationRegisteryStorage,
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
     * @dev Whitelist a new Course Implm Contract
     * @notice Only Allowed for Owner
     *
     * @param _courseImplAddress Course Implm  address
     */
    function whitelistCourseImplm(address _courseImplAddress) public onlyOwner {
        getWhitelistedCourseImplementation[_courseImplAddress] = true;
    }

    /**
     * @dev Disable a Course Implm contract at any point
     * @notice Only Allowed for Owner
     *
     * @param _courseImplAddress  Course Implm  address
     */
    function disableCourseModule(address _courseImplAddress) public onlyOwner {
        getWhitelistedCourseImplementation[_courseImplAddress] = false;
    }

    /**
     * @dev Whitelist a new Resource Implm Contract
     * @notice Only Allowed for Owner
     *
     * @param _resourceImplAddress Resource Implm  address
     */
    function whitelistResourceImplm(
        address _resourceImplAddress
    ) public onlyOwner {
        getWhitelistedResourceImplementation[_resourceImplAddress] = true;
    }

    /**
     * @dev Disable a Resource Implm contract at any point
     * @notice Only Allowed for Owner
     *
     * @param _resourceImplAddress  Resource Implm   address
     */
    function disableResourceModule(
        address _resourceImplAddress
    ) public onlyOwner {
        getWhitelistedResourceImplementation[_resourceImplAddress] = false;
    }

    /**
     * @dev Whitelist a new Certificate Implm Contract
     * @notice Only Allowed for Owner
     *
     * @param _certificateImplAddress Certificate Implm  address
     */
    function whitelistCertificateImplm(
        address _certificateImplAddress
    ) public onlyOwner {
        getWhitelistedCertificateImplementation[_certificateImplAddress] = true;
    }

    /**
     * @dev Disable a Certificate Implm contract at any point
     * @notice Only Allowed for Owner
     *
     * @param _certificateImplAddress  Certificate Implm  address
     */
    function disableCertificateModule(
        address _certificateImplAddress
    ) public onlyOwner {
        getWhitelistedCertificateImplementation[
            _certificateImplAddress
        ] = false;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}
}
