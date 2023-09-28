// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface ILensHub {
    function balanceOf(address owner) external view returns (uint256 balance);
}
