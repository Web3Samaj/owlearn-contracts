import {
  CourseResourceBurned as CourseResourceBurnedEvent,
  CourseResourceInitialised as CourseResourceInitialisedEvent,
  CourseResourceUpdated as CourseResourceUpdatedEvent,
  CourseURIUpdated as CourseURIUpdatedEvent,
  NewCourseResourceMinted as NewCourseResourceMintedEvent,
  Transfer as TransferEvent,
} from "../../generated/templates/OwlearnCourseResource/OwlearnCourseResource";
import { Resource, Course, Educator } from "../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleNewCourseResourceMinted(
  event: NewCourseResourceMintedEvent
): void {
  let totalResourcesMinted = event.params.totalResourceMinted;
  if (totalResourcesMinted) {
    for (let id = 0; id < totalResourcesMinted.toI32(); i++) {
      // Need to get the before minted tokenIds , to get the right token Id
      let entity = new Resource(Bytes.fromI32(id));

      entity.resourceURI = event.params.courseURIs[id];
      entity.resourceId = BigInt.fromI32(id);

      entity.save();
    }
  }
}

export function handleCourseResourceBurned(
  event: CourseResourceBurnedEvent
): void {
  // let entity = new CourseResourceBurned(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  // entity.tokenId = event.params.tokenId;
  // entity.save();
}

export function handleCourseResourceUpdated(
  event: CourseResourceUpdatedEvent
): void {
  let entity = Resource.load(Bytes.fromBigInt(event.params.tokenId));
  if (entity == null) {
    return;
  }

  entity.resourceURI = event.params.newResourceURI;

  entity.save();
}

export function handleCourseURIUpdated(event: CourseURIUpdatedEvent): void {
  // fetch Course URI somehow
  let entity = new Course(courseAddress);
  if (entity == null) {
    return;
  }
  entity.courseURI = event.params.newCourseURI;

  entity.save();
}

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   );
//   entity.from = event.params.from;
//   entity.to = event.params.to;
//   entity.tokenId = event.params.tokenId;

//   entity.blockNumber = event.block.number;
//   entity.blockTimestamp = event.block.timestamp;
//   entity.transactionHash = event.transaction.hash;

//   entity.save();
// }
