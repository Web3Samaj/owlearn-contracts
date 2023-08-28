// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/modules/Registery/OwlearnModuleRegistery.sol";
import "../src/Proxy/ModuleRegisteryProxy.sol";

contract OwlearnModuleRegisteryScript is Test {
    OwlearnModuleRegistery public moduleRegistery;
    address public alice = address(0x1);
    address public mockModule = address(0x5);

    function setUp() public {
        address moduleRegisteryImplmentation = address(
            new OwlearnModuleRegistery()
        );

        bytes memory factoryInitCode = abi.encodeWithSelector(
            OwlearnModuleRegistery.initialise.selector
        );

        moduleRegistery = OwlearnModuleRegistery(
            address(
                new ModuleRegisteryProxy(
                    moduleRegisteryImplmentation,
                    factoryInitCode
                )
            )
        );
    }

    function testWhitelistModule() public {
        moduleRegistery.whitelistModule(mockModule);

        assertEq(moduleRegistery.getWhitelistedModules(mockModule), true);
    }

    function testFailWhitelistModuleExternal() public {
        startHoax(alice, 1e18);

        moduleRegistery.whitelistModule(mockModule);
    }
}
