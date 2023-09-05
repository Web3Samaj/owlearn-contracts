// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  DataSourceTemplate,
  DataSourceContext
} from "@graphprotocol/graph-ts";

export class OwlearnCourse extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("OwlearnCourse", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "OwlearnCourse",
      [address.toHex()],
      context
    );
  }
}

export class OwlearnCourseCertificates extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("OwlearnCourseCertificates", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "OwlearnCourseCertificates",
      [address.toHex()],
      context
    );
  }
}

export class OwlearnCourseResource extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("OwlearnCourseResource", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "OwlearnCourseResource",
      [address.toHex()],
      context
    );
  }
}
