import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  Approval,
  ApprovalForAll,
  BeaconUpgraded,
  ConsecutiveTransfer,
  CourseResourceBurned,
  CourseResourceInitialised,
  CourseResourceUpdated,
  CourseURIUpdated,
  Initialized,
  NewCourseResourceMinted,
  OwnershipTransferred,
  Transfer,
  Upgraded
} from "../generated/OwlearnCourseResource/OwlearnCourseResource"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createConsecutiveTransferEvent(
  fromTokenId: BigInt,
  toTokenId: BigInt,
  from: Address,
  to: Address
): ConsecutiveTransfer {
  let consecutiveTransferEvent = changetype<ConsecutiveTransfer>(newMockEvent())

  consecutiveTransferEvent.parameters = new Array()

  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId)
    )
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId)
    )
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return consecutiveTransferEvent
}

export function createCourseResourceBurnedEvent(
  tokenId: BigInt
): CourseResourceBurned {
  let courseResourceBurnedEvent = changetype<CourseResourceBurned>(
    newMockEvent()
  )

  courseResourceBurnedEvent.parameters = new Array()

  courseResourceBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return courseResourceBurnedEvent
}

export function createCourseResourceInitialisedEvent(
  courseName: string,
  courseSymbol: string,
  creator: Address
): CourseResourceInitialised {
  let courseResourceInitialisedEvent = changetype<CourseResourceInitialised>(
    newMockEvent()
  )

  courseResourceInitialisedEvent.parameters = new Array()

  courseResourceInitialisedEvent.parameters.push(
    new ethereum.EventParam("courseName", ethereum.Value.fromString(courseName))
  )
  courseResourceInitialisedEvent.parameters.push(
    new ethereum.EventParam(
      "courseSymbol",
      ethereum.Value.fromString(courseSymbol)
    )
  )
  courseResourceInitialisedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return courseResourceInitialisedEvent
}

export function createCourseResourceUpdatedEvent(
  tokenId: BigInt,
  newResourceURI: string
): CourseResourceUpdated {
  let courseResourceUpdatedEvent = changetype<CourseResourceUpdated>(
    newMockEvent()
  )

  courseResourceUpdatedEvent.parameters = new Array()

  courseResourceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  courseResourceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newResourceURI",
      ethereum.Value.fromString(newResourceURI)
    )
  )

  return courseResourceUpdatedEvent
}

export function createCourseURIUpdatedEvent(
  newCourseURI: string
): CourseURIUpdated {
  let courseUriUpdatedEvent = changetype<CourseURIUpdated>(newMockEvent())

  courseUriUpdatedEvent.parameters = new Array()

  courseUriUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newCourseURI",
      ethereum.Value.fromString(newCourseURI)
    )
  )

  return courseUriUpdatedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNewCourseResourceMintedEvent(
  totalResourceMinted: BigInt,
  courseURIs: Array<string>
): NewCourseResourceMinted {
  let newCourseResourceMintedEvent = changetype<NewCourseResourceMinted>(
    newMockEvent()
  )

  newCourseResourceMintedEvent.parameters = new Array()

  newCourseResourceMintedEvent.parameters.push(
    new ethereum.EventParam(
      "totalResourceMinted",
      ethereum.Value.fromUnsignedBigInt(totalResourceMinted)
    )
  )
  newCourseResourceMintedEvent.parameters.push(
    new ethereum.EventParam(
      "courseURIs",
      ethereum.Value.fromStringArray(courseURIs)
    )
  )

  return newCourseResourceMintedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
