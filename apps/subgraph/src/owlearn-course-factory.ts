import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  CourseCreated as CourseCreatedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Upgraded as UpgradedEvent
} from "../generated/OwlearnCourseFactory/OwlearnCourseFactory"
import {
  AdminChanged,
  BeaconUpgraded,
  CourseCreated,
  Initialized,
  OwnershipTransferred,
  Upgraded
} from "../generated/schema"

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCourseCreated(event: CourseCreatedEvent): void {
  let entity = new CourseCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creatorId = event.params.creatorId
  entity.courseId = event.params.courseId
  entity.courseAddress = event.params.courseAddress
  entity.courseName = event.params.courseName
  entity.courseSymbol = event.params.courseSymbol
  entity.creator = event.params.creator
  entity.courseURI = event.params.courseURI
  entity.courseNFTURIs = event.params.courseNFTURIs
  entity.certificateBaseURI = event.params.certificateBaseURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
