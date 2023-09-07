import {
  OwlearnCourseResource,
  CourseResourceBurned as CourseResourceBurnedEvent,
  CourseResourceInitialised as CourseResourceInitialisedEvent,
  CourseResourceUpdated as CourseResourceUpdatedEvent,
  CourseURIUpdated as CourseURIUpdatedEvent,
  NewCourseResourceMinted as NewCourseResourceMintedEvent,
  Transfer as TransferEvent,
} from "../../generated/templates/OwlearnCourseResource/OwlearnCourseResource";
import { Resource, Course, Educator } from "../../generated/schema";
import { BigInt, Bytes, store } from "@graphprotocol/graph-ts";

export function handleNewCourseResourceMinted(
  event: NewCourseResourceMintedEvent
): void {
  let totalResourcesMinted = event.params.totalResourceMinted;
  let courseResource = OwlearnCourseResource.bind(event.address);
  let totalSupply = courseResource.totalSupply();
  let courseAddress = courseResource.owlearnCourse();
  if (totalResourcesMinted) {
    for (let id = 0; id < totalResourcesMinted.toI32(); id++) {
      // Need to get the before minted tokenIds , to get the right token Id
      let totalSupplyBefore =
        totalSupply.toI32() - totalResourcesMinted.toI32();

      let entity = new Resource(Bytes.fromI32(id + totalSupplyBefore));
      entity.course = courseAddress;
      entity.resourceURI = event.params.courseURIs[id];
      entity.resourceId = BigInt.fromI32(id + totalSupplyBefore);

      entity.save();
    }
  }
}

export function handleCourseResourceBurned(
  event: CourseResourceBurnedEvent
): void {
  // Delete the particuar courseResource Somehow
  let entity = Resource.load(Bytes.fromBigInt(event.params.tokenId));
  if (entity == null) {
    return;
  }
  store.remove("Resource", `${entity.id}`);
}

export function handleCourseResourceUpdated(
  event: CourseResourceUpdatedEvent
): void {
  let entity = Resource.load(Bytes.fromI32(event.params.tokenId.toI32()));
  if (entity == null) {
    return;
  }

  entity.resourceURI = event.params.newResourceURI;

  entity.save();
}

export function handleCourseURIUpdated(event: CourseURIUpdatedEvent): void {
  let courseResource = OwlearnCourseResource.bind(event.address);
  let courseAddress = courseResource.owlearnCourse();
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
