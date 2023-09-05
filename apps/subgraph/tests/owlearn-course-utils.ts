import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  CourseInitialised,
  Initialized,
  MintModuleDisabled,
  MintModuleInitialised,
  OwnershipTransferred,
  Upgraded
} from "../generated/OwlearnCourse/OwlearnCourse"

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

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createCourseInitialisedEvent(
  course: Address,
  resource: Address,
  certificates: Address
): CourseInitialised {
  let courseInitialisedEvent = changetype<CourseInitialised>(newMockEvent())

  courseInitialisedEvent.parameters = new Array()

  courseInitialisedEvent.parameters.push(
    new ethereum.EventParam("course", ethereum.Value.fromAddress(course))
  )
  courseInitialisedEvent.parameters.push(
    new ethereum.EventParam("resource", ethereum.Value.fromAddress(resource))
  )
  courseInitialisedEvent.parameters.push(
    new ethereum.EventParam(
      "certificates",
      ethereum.Value.fromAddress(certificates)
    )
  )

  return courseInitialisedEvent
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

export function createMintModuleDisabledEvent(
  course: Address
): MintModuleDisabled {
  let mintModuleDisabledEvent = changetype<MintModuleDisabled>(newMockEvent())

  mintModuleDisabledEvent.parameters = new Array()

  mintModuleDisabledEvent.parameters.push(
    new ethereum.EventParam("course", ethereum.Value.fromAddress(course))
  )

  return mintModuleDisabledEvent
}

export function createMintModuleInitialisedEvent(
  course: Address,
  moduleAddress: Address
): MintModuleInitialised {
  let mintModuleInitialisedEvent = changetype<MintModuleInitialised>(
    newMockEvent()
  )

  mintModuleInitialisedEvent.parameters = new Array()

  mintModuleInitialisedEvent.parameters.push(
    new ethereum.EventParam("course", ethereum.Value.fromAddress(course))
  )
  mintModuleInitialisedEvent.parameters.push(
    new ethereum.EventParam(
      "moduleAddress",
      ethereum.Value.fromAddress(moduleAddress)
    )
  )

  return mintModuleInitialisedEvent
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
