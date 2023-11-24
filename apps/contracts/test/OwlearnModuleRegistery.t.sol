// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/modules/Registery/OwlearnModuleRegistery.sol";
import "../src/Proxy/ModuleRegisteryProxy.sol";
import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/OwlearnCourse/OwlearnCourse.sol";
import "../src/OwlearnCourse/Certificates/OwlearnCourseCertificates.sol";
import "../src/OwlearnCourse/Resources/OwlearnCourseResources.sol";
import "../src/Factory/CourseFactory.sol";
import "../src/Proxy/FactoryProxy.sol";
import "../src/extras/FeeToken.sol";
import "../src/modules/ModuleExample/FeeModule.sol";
import "../src/Implementation/ImplementationRegistery.sol";

contract OwlearnModuleRegisteryScript is Test {
    OwlearnModuleRegistery public moduleRegistery;
    address public alice = address(0x1);
    address public mockModule = address(0x5);
    address public feeModuleImplementation;

    function setUp() public {
        ImplementationRegistery implRegistery = new ImplementationRegistery();
        implRegistery.initialize();

        // setup factory
        OwlearnEducatorBadge owlearnEducatorBadge = new OwlearnEducatorBadge();
        OwlearnCourse owlearnCourseImplementation = new OwlearnCourse();
        OwlearnCourseResources resourceImplementation = new OwlearnCourseResources();
        OwlearnCourseCertificates certificateImplementation = new OwlearnCourseCertificates();

        owlearnEducatorBadge.initialize("", address(0));
        owlearnEducatorBadge.mintEducatorBadges(alice, 1);

        address courseFactoryImplementation = address(
            new OwlearnCourseFactory()
        );

        bytes memory factoryInitCode = abi.encodeWithSelector(
            OwlearnCourseFactory.initialize.selector,
            owlearnEducatorBadge,
            address(owlearnCourseImplementation),
            address(resourceImplementation),
            address(certificateImplementation),
            address(0),
            address(implRegistery)
        );

        OwlearnCourseFactory courseFactory = OwlearnCourseFactory(
            address(
                new FactoryProxy(courseFactoryImplementation, factoryInitCode)
            )
        );

        address moduleRegisteryImplmentation = address(
            new OwlearnModuleRegistery()
        );

        bytes memory registeryInitCode = abi.encodeWithSelector(
            OwlearnModuleRegistery.initialize.selector
        );

        moduleRegistery = OwlearnModuleRegistery(
            address(
                new ModuleRegisteryProxy(
                    moduleRegisteryImplmentation,
                    registeryInitCode
                )
            )
        );

        moduleRegistery.setFactory(address(courseFactory));

        feeModuleImplementation = address(new FeeModule());
    }

    function testWhitelistModuleImpl() public {
        // only owner can perform this
        moduleRegistery.whitelistModuleImplementation(feeModuleImplementation);

        assertEq(
            moduleRegistery.getWhitelistedModuleImplementation(
                feeModuleImplementation
            ),
            true
        );
    }

    function testFailWhitelistModuleExternal() public {
        startHoax(alice, 1e18);
        moduleRegistery.whitelistModuleImplementation(feeModuleImplementation);
    }

    function testCreateModuleProxy() public {
        moduleRegistery.whitelistModuleImplementation(feeModuleImplementation);
        address feeModuleProxy = moduleRegistery.createModuleProxy(
            feeModuleImplementation
        );
        assertEq(moduleRegistery.getWhitelistedModules(feeModuleProxy), true);
    }

    function testFailCreateModuleProxy() public {
        // NOT WHITELISTED IMPLEMENTATION WILL FAIL
        address feeModuleProxy = moduleRegistery.createModuleProxy(
            feeModuleImplementation
        );
    }
}
