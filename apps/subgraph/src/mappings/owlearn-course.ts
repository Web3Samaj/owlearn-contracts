import {
  CourseInitialised as CourseInitialisedEvent,
  MintModuleDisabled as MintModuleDisabledEvent,
  MintModuleInitialised as MintModuleInitialisedEvent,
} from "../../generated/templates/OwlearnCourse/OwlearnCourse";
import {
  Course,
  Educator,
  Certificate,
  Resource,
} from "../../generated/schema";
import {
  OwlearnCourseCertificates,
  OwlearnCourseResource,
} from "../../generated/templates";

export function handleCourseInitialised(event: CourseInitialisedEvent): void {
  let entity = Course.load(event.params.course);
  if (entity == null) {
    return;
  }
  entity.resourceAddress = event.params.resource;
  entity.certificateAddress = event.params.certificates;
  entity.certificate = event.params.certificates;
  OwlearnCourseCertificates.create(event.params.resource);
  let certificate = new Certificate(event.params.certificates);
  certificate.certificateAddress = event.params.certificates;
  certificate.course = entity.id;
  OwlearnCourseResource.create(event.params.certificates);

  certificate.save();
  entity.save();
}

export function handleMintModuleDisabled(event: MintModuleDisabledEvent): void {
  let entity = Course.load(event.params.course);
  if (entity == null) {
    return;
  }
  entity.mintModule = null;
  entity.save();
}

export function handleMintModuleInitialised(
  event: MintModuleInitialisedEvent
): void {
  let entity = Course.load(event.params.course);
  if (entity == null) {
    return;
  }
  entity.mintModule = event.params.moduleAddress;

  entity.save();
}
