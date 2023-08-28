// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/EducatorBadge/OwlearnEducatorBadge.sol";
import "../src/modules/Registery/OwlearnModuleRegistery.sol";
import "../src/OwlearnCourse/OwlearnCourse.sol";
import "../src/OwlearnCourse/Certificates/OwlearnCourseCertificates.sol";
import "../src/OwlearnCourse/Resources/OwlearnCourseResources.sol";
import "../src/Factory/CourseFactory.sol";
import "../src/Proxy/FactoryProxy.sol";
import "../src/extras/FeeToken.sol";
import "../src/modules/ModuleExample/FeeModule.sol";
import "../src/Implementation/ImplementationRegistery.sol";

contract FeeModuleScript is Test {
    string[] public nftURIs;
    OwlearnCourseFactory public courseFactory;
    OwlearnCourse public owlearnCourse;
    FeeModule public feeModule;
    FeeToken public feeToken;
    address public alice = address(0x1); // Course Owner

    uint public creatorId = 1;
    uint public courseId;

    function setUp() public {
        // setup registery
        OwlearnModuleRegistery moduleRegistery = new OwlearnModuleRegistery();
        moduleRegistery.initialise();

        ImplementationRegistery implRegistery = new ImplementationRegistery();
        implRegistery.initialise();

        // setup factory
        OwlearnEducatorBadge owlearnEducatorBadge = new OwlearnEducatorBadge();
        OwlearnCourse owlearnCourseImplementation = new OwlearnCourse();
        OwlearnCourseResources resourceImplementation = new OwlearnCourseResources();
        OwlearnCourseCertificates certificateImplementation = new OwlearnCourseCertificates();

        owlearnEducatorBadge.initialize("");
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
            address(moduleRegistery),
            address(implRegistery)
        );

        courseFactory = OwlearnCourseFactory(
            address(
                new FactoryProxy(courseFactoryImplementation, factoryInitCode)
            )
        );

        // create & whitelisit the new module
        feeModule = new FeeModule(address(courseFactory));

        moduleRegistery.whitelistModule(address(feeModule));

        // create a course
        nftURIs.push("s1");
        nftURIs.push("s2");

        vm.startPrank(alice);

        // Setup an ERC20 Token and mint
        feeToken = new FeeToken(); // auto mint in the constructor

        (address course, uint _courseId) = courseFactory.createCourse(
            1,
            "Python Beginners",
            "PB",
            "s",
            nftURIs,
            "c"
        );
        courseId = _courseId;

        owlearnCourse = OwlearnCourse(course);

        vm.stopPrank();
    }

    function testInitialise() public {
        startHoax(alice, 1e18);
        // Set the module in courses
        uint amount = 10 * 10 ** feeToken.decimals();
        bytes memory data = abi.encode(address(feeToken), amount, alice);
        owlearnCourse.setAndInitialiseMintModule(address(feeModule), data);

        FeeModule.FeeData memory feeData = feeModule.getFeeData(
            address(owlearnCourse)
        );

        assertEq(feeData.currency, address(feeToken));
        assertEq(feeData.amount, amount);
        assertEq(feeData.recepient, alice);
        assertEq(owlearnCourse.mintModule(), address(feeModule));
    }

    function testFailInitialise() public {
        // direct initialisation is restricted
        uint amount = 10 * 10 ** feeToken.decimals();
        bytes memory data = abi.encode(address(feeToken), amount, alice);
        feeModule.initialiseMintModule(creatorId, courseId, data);
    }

    function testMint() public {
        startHoax(alice, 1e18);
        /// Approve the tokens
        uint amount = 10 * 10 ** feeToken.decimals();
        bytes memory data = abi.encode(address(feeToken), amount, alice);
        owlearnCourse.setAndInitialiseMintModule(address(feeModule), data);

        feeToken.approve(address(feeModule), amount);
        /// Mint
        owlearnCourse.mintCourseCertificate(alice, "");
    }

    function testFailMint() public {
        vm.startPrank(alice);

        uint amount = 10 * 10 ** feeToken.decimals();
        bytes memory data = abi.encode(address(feeToken), amount, alice);
        owlearnCourse.setAndInitialiseMintModule(address(feeModule), data);

        vm.stopPrank();

        /// No approval
        owlearnCourse.mintCourseCertificate(alice, "");
    }
}
