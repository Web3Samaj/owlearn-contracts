import {
  OwlearnCourseCertificates,
  CertificateBurned as CertificateBurnedEvent,
  CertificateMinted as CertificateMintedEvent,
  CertificateURIUpdated as CertificateURIUpdatedEvent,
  CourseCertificateIntialised as CourseCertificateIntialisedEvent,
  Transfer as TransferEvent,
} from "../../generated/templates/OwlearnCourseCertificates/OwlearnCourseCertificates";
import { Certificate, Course, User } from "../../generated/schema";
import { store } from "@graphprotocol/graph-ts";

export function handleCourseCertificateIntialised(
  event: CourseCertificateIntialisedEvent
): void {
  let entity = Certificate.load(event.address);
  if (entity == null) {
    return;
  }
  entity.certificateName = event.params.courseCertificateName;
  entity.certificateSymbol = event.params.courseCertificateSymbol;
  entity.certificateBaseURI = event.params.certificateBaseURI;

  entity.save();
}

export function handleCertificateMinted(event: CertificateMintedEvent): void {
  let entity = Certificate.load(event.address);
  if (entity == null) {
    return;
  }
  let preEnrolledUser = entity.enrolledUsers;
  if (preEnrolledUser == null) {
    entity.enrolledUsers = [event.params.to];
  } else {
    preEnrolledUser.push(event.params.to);
    entity.enrolledUsers = preEnrolledUser;
  }

  let user = User.load(event.params.to);
  if (user == null) {
    return;
  }
  let courseCertificates = OwlearnCourseCertificates.bind(event.address);
  let courseAddress = courseCertificates.manager();
  let preEnrolledCourses = user.enrolledCourses;
  if (preEnrolledCourses == null) {
    user.enrolledCourses = [courseAddress];
  } else {
    preEnrolledCourses.push(courseAddress);
    user.enrolledCourses = preEnrolledCourses;
  }
  user.save();
  entity.save();
}

export function handleCertificateBurned(event: CertificateBurnedEvent): void {
  let entity = Certificate.load(event.address);
  if (entity == null) {
    return;
  }
  let courseCertificate = OwlearnCourseCertificates.bind(event.address);
  let user = courseCertificate.ownerOf(event.params.tokenId);
  let userEntity = User.load(user);
  if (userEntity == null) {
    return;
  }
  let preEnrolledCourses = userEntity.enrolledCourses;
  // Need to somehow find the User , and then delete the records from the courses and Users record

  entity.save();
}

export function handleCertificateURIUpdated(
  event: CertificateURIUpdatedEvent
): void {
  let entity = Certificate.load(event.address);
  if (entity == null) {
    return;
  }
  entity.certificateBaseURI = event.params.newBaseURI;

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
