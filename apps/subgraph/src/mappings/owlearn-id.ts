import {
  OwlIdRegistered as OwlIdRegisteredEvent,
  Transfer as TransferEvent,
} from "../../generated/OwlearnId/OwlearnId";
import { User } from "../../generated/schema";

// New Owl Id registered Case
export function handleOwlIdRegistered(event: OwlIdRegisteredEvent): void {
  let entity = new User(event.params.user);
  entity.address = event.params.user;
  entity.username = event.params.name;
  entity.owlId = event.params.tokenId;
  // no enrolled courses initially
  entity.save();
}

// Need to think in Case OwlID is burned or transferred as that event is not blocked
// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(event.param.from);
//   entity.from = event.params.from;
//   entity.to = event.params.to;
//   entity.tokenId = event.params.tokenId;

//   entity.blockNumber = event.block.number;
//   entity.blockTimestamp = event.block.timestamp;
//   entity.transactionHash = event.transaction.hash;

//   entity.save();
// }
