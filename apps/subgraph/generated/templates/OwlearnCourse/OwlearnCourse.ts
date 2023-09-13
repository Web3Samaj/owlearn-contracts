// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CourseInitialised extends ethereum.Event {
  get params(): CourseInitialised__Params {
    return new CourseInitialised__Params(this);
  }
}

export class CourseInitialised__Params {
  _event: CourseInitialised;

  constructor(event: CourseInitialised) {
    this._event = event;
  }

  get course(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get resource(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get certificates(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class MintModuleDisabled extends ethereum.Event {
  get params(): MintModuleDisabled__Params {
    return new MintModuleDisabled__Params(this);
  }
}

export class MintModuleDisabled__Params {
  _event: MintModuleDisabled;

  constructor(event: MintModuleDisabled) {
    this._event = event;
  }

  get course(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class MintModuleInitialised extends ethereum.Event {
  get params(): MintModuleInitialised__Params {
    return new MintModuleInitialised__Params(this);
  }
}

export class MintModuleInitialised__Params {
  _event: MintModuleInitialised;

  constructor(event: MintModuleInitialised) {
    this._event = event;
  }

  get course(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get moduleAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwlearnCourse extends ethereum.SmartContract {
  static bind(address: Address): OwlearnCourse {
    return new OwlearnCourse("OwlearnCourse", address);
  }

  courseCertificates(): Address {
    let result = super.call(
      "courseCertificates",
      "courseCertificates():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_courseCertificates(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "courseCertificates",
      "courseCertificates():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  courseId(): BigInt {
    let result = super.call("courseId", "courseId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_courseId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("courseId", "courseId():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  courseResources(): Address {
    let result = super.call(
      "courseResources",
      "courseResources():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_courseResources(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "courseResources",
      "courseResources():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  creatorId(): BigInt {
    let result = super.call("creatorId", "creatorId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_creatorId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("creatorId", "creatorId():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  implRegistery(): Address {
    let result = super.call("implRegistery", "implRegistery():(address)", []);

    return result[0].toAddress();
  }

  try_implRegistery(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "implRegistery",
      "implRegistery():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  mintModule(): Address {
    let result = super.call("mintModule", "mintModule():(address)", []);

    return result[0].toAddress();
  }

  try_mintModule(): ethereum.CallResult<Address> {
    let result = super.tryCall("mintModule", "mintModule():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  moduleRegistery(): Address {
    let result = super.call(
      "moduleRegistery",
      "moduleRegistery():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_moduleRegistery(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "moduleRegistery",
      "moduleRegistery():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DeleteCourseNFTCall extends ethereum.Call {
  get inputs(): DeleteCourseNFTCall__Inputs {
    return new DeleteCourseNFTCall__Inputs(this);
  }

  get outputs(): DeleteCourseNFTCall__Outputs {
    return new DeleteCourseNFTCall__Outputs(this);
  }
}

export class DeleteCourseNFTCall__Inputs {
  _call: DeleteCourseNFTCall;

  constructor(call: DeleteCourseNFTCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DeleteCourseNFTCall__Outputs {
  _call: DeleteCourseNFTCall;

  constructor(call: DeleteCourseNFTCall) {
    this._call = call;
  }
}

export class DisableModuleCall extends ethereum.Call {
  get inputs(): DisableModuleCall__Inputs {
    return new DisableModuleCall__Inputs(this);
  }

  get outputs(): DisableModuleCall__Outputs {
    return new DisableModuleCall__Outputs(this);
  }
}

export class DisableModuleCall__Inputs {
  _call: DisableModuleCall;

  constructor(call: DisableModuleCall) {
    this._call = call;
  }
}

export class DisableModuleCall__Outputs {
  _call: DisableModuleCall;

  constructor(call: DisableModuleCall) {
    this._call = call;
  }
}

export class EditCourseNFTCall extends ethereum.Call {
  get inputs(): EditCourseNFTCall__Inputs {
    return new EditCourseNFTCall__Inputs(this);
  }

  get outputs(): EditCourseNFTCall__Outputs {
    return new EditCourseNFTCall__Outputs(this);
  }
}

export class EditCourseNFTCall__Inputs {
  _call: EditCourseNFTCall;

  constructor(call: EditCourseNFTCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get newNFTURI(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class EditCourseNFTCall__Outputs {
  _call: EditCourseNFTCall;

  constructor(call: EditCourseNFTCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _creatorId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _courseId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get courseName(): string {
    return this._call.inputValues[2].value.toString();
  }

  get courseSymbol(): string {
    return this._call.inputValues[3].value.toString();
  }

  get courseCreator(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get courseURI(): string {
    return this._call.inputValues[5].value.toString();
  }

  get courseNFTURIs(): Array<string> {
    return this._call.inputValues[6].value.toStringArray();
  }

  get certificateBaseURI(): string {
    return this._call.inputValues[7].value.toString();
  }

  get _resourceImplementation(): Address {
    return this._call.inputValues[8].value.toAddress();
  }

  get _certificateImplementation(): Address {
    return this._call.inputValues[9].value.toAddress();
  }

  get moduleRegisteryAddress(): Address {
    return this._call.inputValues[10].value.toAddress();
  }

  get implmRegisteryAddress(): Address {
    return this._call.inputValues[11].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintCourseCertificateCall extends ethereum.Call {
  get inputs(): MintCourseCertificateCall__Inputs {
    return new MintCourseCertificateCall__Inputs(this);
  }

  get outputs(): MintCourseCertificateCall__Outputs {
    return new MintCourseCertificateCall__Outputs(this);
  }
}

export class MintCourseCertificateCall__Inputs {
  _call: MintCourseCertificateCall;

  constructor(call: MintCourseCertificateCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class MintCourseCertificateCall__Outputs {
  _call: MintCourseCertificateCall;

  constructor(call: MintCourseCertificateCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class MintCourseNFTsCall extends ethereum.Call {
  get inputs(): MintCourseNFTsCall__Inputs {
    return new MintCourseNFTsCall__Inputs(this);
  }

  get outputs(): MintCourseNFTsCall__Outputs {
    return new MintCourseNFTsCall__Outputs(this);
  }
}

export class MintCourseNFTsCall__Inputs {
  _call: MintCourseNFTsCall;

  constructor(call: MintCourseNFTsCall) {
    this._call = call;
  }

  get courseNFTURIs(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }
}

export class MintCourseNFTsCall__Outputs {
  _call: MintCourseNFTsCall;

  constructor(call: MintCourseNFTsCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetAndInitialiseMintModuleCall extends ethereum.Call {
  get inputs(): SetAndInitialiseMintModuleCall__Inputs {
    return new SetAndInitialiseMintModuleCall__Inputs(this);
  }

  get outputs(): SetAndInitialiseMintModuleCall__Outputs {
    return new SetAndInitialiseMintModuleCall__Outputs(this);
  }
}

export class SetAndInitialiseMintModuleCall__Inputs {
  _call: SetAndInitialiseMintModuleCall;

  constructor(call: SetAndInitialiseMintModuleCall) {
    this._call = call;
  }

  get _mintModule(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class SetAndInitialiseMintModuleCall__Outputs {
  _call: SetAndInitialiseMintModuleCall;

  constructor(call: SetAndInitialiseMintModuleCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
