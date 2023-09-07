import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Course } from "../generated/schema";
import { CourseCreated as CourseCreatedEvent } from "../generated/OwlearnCourseFactory/OwlearnCourseFactory";
import { handleCourseCreated } from "../src/mappings/owlearn-course-factory";
import { createCourseCreatedEvent } from "./owlearn-course-factory-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let courseAddress = Address.fromString(
      "0xE6d530b8A8B7a354C8057921eEa1fDe5DA12DF7A"
    );
    let creator = Address.fromString(
      "0x62C43323447899acb61C18181e34168903E033Bf"
    );
    let newCourseCreatedEvent = createCourseCreatedEvent(
      new BigInt(1),
      new BigInt(1),
      courseAddress,
      "Solidity",
      "SD",
      creator,
      "ipfs://",
      ["ipfs://1", "ipfs://2"],
      "ipfs://Cer"
    );
    handleCourseCreated(newCourseCreatedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Course created and stored", () => {
    assert.entityCount("Course", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Course",
      "0xE6d530b8A8B7a354C8057921eEa1fDe5DA12DF7A",
      "name",
      "Solidity"
    );

    assert.fieldEquals(
      "Course",
      "0xE6d530b8A8B7a354C8057921eEa1fDe5DA12DF7A",
      "courseURI",
      "ipfs://"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
