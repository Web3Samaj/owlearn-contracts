// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract CertificateProxy is ERC1967Proxy {
    constructor(
        address _logic,
        bytes memory _data
    ) payable ERC1967Proxy(_logic, _data) {}
}
