import {
  EducatorRegistered as EducatorRegisteredEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
} from "../../generated/OwlearnEducatorBadge/OwlearnEducatorBadge";
import { Educator, User } from "../../generated/schema";

export function handleEducatorRegistered(event: EducatorRegisteredEvent): void {
  let entity = new Educator(event.params.educator);
  entity.address = event.params.educator;
  entity.educatorId = event.params.creatorId;
  let user = User.load(event.params.educator);
  if (user == null) {
    return;
  }
  entity.username = user.username;
  entity.save();
}

// Need to handle EducatorBadgeBurn , from transfer

// export function handleTransferBatch(event: TransferBatchEvent): void {
//   let entity = new TransferBatch(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   );
//   entity.operator = event.params.operator;
//   entity.from = event.params.from;
//   entity.to = event.params.to;
//   entity.ids = event.params.ids;
//   entity.values = event.params.values;

//   entity.blockNumber = event.block.number;
//   entity.blockTimestamp = event.block.timestamp;
//   entity.transactionHash = event.transaction.hash;

//   entity.save();
// }

// export function handleTransferSingle(event: TransferSingleEvent): void {
//   let entity = new TransferSingle(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   );
//   entity.operator = event.params.operator;
//   entity.from = event.params.from;
//   entity.to = event.params.to;
//   entity.OwlearnEducatorBadge_id = event.params.id;
//   entity.value = event.params.value;

//   entity.blockNumber = event.block.number;
//   entity.blockTimestamp = event.block.timestamp;
//   entity.transactionHash = event.transaction.hash;

//   entity.save();
// }
