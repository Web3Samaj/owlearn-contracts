import { CourseCreated as CourseCreatedEvent } from "../../generated/OwlearnCourseFactory/OwlearnCourseFactory";
import { Course, Educator } from "../../generated/schema";
import { OwlearnCourse } from "../../generated/templates";

export function handleCourseCreated(event: CourseCreatedEvent): void {
  let entity = new Course(event.params.courseAddress);
  entity.creatorId = event.params.creatorId;
  entity.courseId = event.params.courseId;
  entity.address = event.params.courseAddress;
  entity.name = event.params.courseName;
  entity.symbol = event.params.courseSymbol;
  entity.courseURI = event.params.courseURI;

  // assign the educator
  let creator = event.params.creator;
  let educator = Educator.load(creator);
  if (educator == null) {
    return;
  }
  entity.educator = educator.id;

  // Add New Course from the templates\
  OwlearnCourse.create(event.params.courseAddress);

  entity.save();
}
