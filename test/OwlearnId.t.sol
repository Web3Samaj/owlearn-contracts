// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/src/Test.sol";

import "../src/OwlearnId.sol";

contract OwnlearnIdScript is Test {
    OwlearnId public ownlearnId;

    function setUp() public {
        ownlearnId = new OwlearnId();
    }
}
