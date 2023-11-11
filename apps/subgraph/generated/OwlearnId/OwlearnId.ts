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

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class BatchMetadataUpdate extends ethereum.Event {
  get params(): BatchMetadataUpdate__Params {
    return new BatchMetadataUpdate__Params(this);
  }
}

export class BatchMetadataUpdate__Params {
  _event: BatchMetadataUpdate;

  constructor(event: BatchMetadataUpdate) {
    this._event = event;
  }

  get _fromTokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _toTokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
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

export class MetadataUpdate extends ethereum.Event {
  get params(): MetadataUpdate__Params {
    return new MetadataUpdate__Params(this);
  }
}

export class MetadataUpdate__Params {
  _event: MetadataUpdate;

  constructor(event: MetadataUpdate) {
    this._event = event;
  }

  get _tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OwlIdRegistered extends ethereum.Event {
  get params(): OwlIdRegistered__Params {
    return new OwlIdRegistered__Params(this);
  }
}

export class OwlIdRegistered__Params {
  _event: OwlIdRegistered;

  constructor(event: OwlIdRegistered) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
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

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
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

export class OwlearnId__domainNamesResult {
  value0: string;
  value1: Address;
  value2: BigInt;

  constructor(value0: string, value1: Address, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getDomain(): string {
    return this.value0;
  }

  getUser(): Address {
    return this.value1;
  }

  getTokenId(): BigInt {
    return this.value2;
  }
}

export class OwlearnId__getNameRecordResultValue0Struct extends ethereum.Tuple {
  get domain(): string {
    return this[0].toString();
  }

  get user(): Address {
    return this[1].toAddress();
  }

  get tokenId(): BigInt {
    return this[2].toBigInt();
  }
}

export class OwlearnId extends ethereum.SmartContract {
  static bind(address: Address): OwlearnId {
    return new OwlearnId("OwlearnId", address);
  }

  FOUR_LETTER_MULTIPLIER(): BigInt {
    let result = super.call(
      "FOUR_LETTER_MULTIPLIER",
      "FOUR_LETTER_MULTIPLIER():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_FOUR_LETTER_MULTIPLIER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "FOUR_LETTER_MULTIPLIER",
      "FOUR_LETTER_MULTIPLIER():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  ONE_LETTER_MULTIPLIER(): BigInt {
    let result = super.call(
      "ONE_LETTER_MULTIPLIER",
      "ONE_LETTER_MULTIPLIER():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_ONE_LETTER_MULTIPLIER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ONE_LETTER_MULTIPLIER",
      "ONE_LETTER_MULTIPLIER():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  PRICE_MULTIPLIER(): BigInt {
    let result = super.call(
      "PRICE_MULTIPLIER",
      "PRICE_MULTIPLIER():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_PRICE_MULTIPLIER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "PRICE_MULTIPLIER",
      "PRICE_MULTIPLIER():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  THREE_LETTER_MULTIPLIER(): BigInt {
    let result = super.call(
      "THREE_LETTER_MULTIPLIER",
      "THREE_LETTER_MULTIPLIER():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_THREE_LETTER_MULTIPLIER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "THREE_LETTER_MULTIPLIER",
      "THREE_LETTER_MULTIPLIER():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  TWO_LETTER_MULTIPLIER(): BigInt {
    let result = super.call(
      "TWO_LETTER_MULTIPLIER",
      "TWO_LETTER_MULTIPLIER():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_TWO_LETTER_MULTIPLIER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "TWO_LETTER_MULTIPLIER",
      "TWO_LETTER_MULTIPLIER():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  allowlistMerkleRoot(): Bytes {
    let result = super.call(
      "allowlistMerkleRoot",
      "allowlistMerkleRoot():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_allowlistMerkleRoot(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "allowlistMerkleRoot",
      "allowlistMerkleRoot():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  blackListNameMerkleRoot(): Bytes {
    let result = super.call(
      "blackListNameMerkleRoot",
      "blackListNameMerkleRoot():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_blackListNameMerkleRoot(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "blackListNameMerkleRoot",
      "blackListNameMerkleRoot():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  checkAllowlist(proof: Array<Bytes>, user: Address): boolean {
    let result = super.call(
      "checkAllowlist",
      "checkAllowlist(bytes32[],address):(bool)",
      [
        ethereum.Value.fromFixedBytesArray(proof),
        ethereum.Value.fromAddress(user)
      ]
    );

    return result[0].toBoolean();
  }

  try_checkAllowlist(
    proof: Array<Bytes>,
    user: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkAllowlist",
      "checkAllowlist(bytes32[],address):(bool)",
      [
        ethereum.Value.fromFixedBytesArray(proof),
        ethereum.Value.fromAddress(user)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  checkBlackListName(proof: Array<Bytes>, _username: string): boolean {
    let result = super.call(
      "checkBlackListName",
      "checkBlackListName(bytes32[],string):(bool)",
      [
        ethereum.Value.fromFixedBytesArray(proof),
        ethereum.Value.fromString(_username)
      ]
    );

    return result[0].toBoolean();
  }

  try_checkBlackListName(
    proof: Array<Bytes>,
    _username: string
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkBlackListName",
      "checkBlackListName(bytes32[],string):(bool)",
      [
        ethereum.Value.fromFixedBytesArray(proof),
        ethereum.Value.fromString(_username)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  checkHandle(_username: string): boolean {
    let result = super.call("checkHandle", "checkHandle(string):(bool)", [
      ethereum.Value.fromString(_username)
    ]);

    return result[0].toBoolean();
  }

  try_checkHandle(_username: string): ethereum.CallResult<boolean> {
    let result = super.tryCall("checkHandle", "checkHandle(string):(bool)", [
      ethereum.Value.fromString(_username)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  checkLensHandle(user: Address): boolean {
    let result = super.call(
      "checkLensHandle",
      "checkLensHandle(address):(bool)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toBoolean();
  }

  try_checkLensHandle(user: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkLensHandle",
      "checkLensHandle(address):(bool)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  domainNames(param0: string): OwlearnId__domainNamesResult {
    let result = super.call(
      "domainNames",
      "domainNames(string):(string,address,uint256)",
      [ethereum.Value.fromString(param0)]
    );

    return new OwlearnId__domainNamesResult(
      result[0].toString(),
      result[1].toAddress(),
      result[2].toBigInt()
    );
  }

  try_domainNames(
    param0: string
  ): ethereum.CallResult<OwlearnId__domainNamesResult> {
    let result = super.tryCall(
      "domainNames",
      "domainNames(string):(string,address,uint256)",
      [ethereum.Value.fromString(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OwlearnId__domainNamesResult(
        value[0].toString(),
        value[1].toAddress(),
        value[2].toBigInt()
      )
    );
  }

  domainRecords(param0: Address): string {
    let result = super.call(
      "domainRecords",
      "domainRecords(address):(string)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toString();
  }

  try_domainRecords(param0: Address): ethereum.CallResult<string> {
    let result = super.tryCall(
      "domainRecords",
      "domainRecords(address):(string)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getNameRecord(_username: string): OwlearnId__getNameRecordResultValue0Struct {
    let result = super.call(
      "getNameRecord",
      "getNameRecord(string):((string,address,uint256))",
      [ethereum.Value.fromString(_username)]
    );

    return changetype<OwlearnId__getNameRecordResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getNameRecord(
    _username: string
  ): ethereum.CallResult<OwlearnId__getNameRecordResultValue0Struct> {
    let result = super.tryCall(
      "getNameRecord",
      "getNameRecord(string):((string,address,uint256))",
      [ethereum.Value.fromString(_username)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<OwlearnId__getNameRecordResultValue0Struct>(value[0].toTuple())
    );
  }

  getNameRecordFromAddress(user: Address): string {
    let result = super.call(
      "getNameRecordFromAddress",
      "getNameRecordFromAddress(address):(string)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toString();
  }

  try_getNameRecordFromAddress(user: Address): ethereum.CallResult<string> {
    let result = super.tryCall(
      "getNameRecordFromAddress",
      "getNameRecordFromAddress(address):(string)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getPrice(_username: string, user: Address): BigInt {
    let result = super.call("getPrice", "getPrice(string,address):(uint256)", [
      ethereum.Value.fromString(_username),
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_getPrice(_username: string, user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPrice",
      "getPrice(string,address):(uint256)",
      [ethereum.Value.fromString(_username), ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isAllowListEnabled(): boolean {
    let result = super.call(
      "isAllowListEnabled",
      "isAllowListEnabled():(bool)",
      []
    );

    return result[0].toBoolean();
  }

  try_isAllowListEnabled(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isAllowListEnabled",
      "isAllowListEnabled():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isBlackListEnabled(): boolean {
    let result = super.call(
      "isBlackListEnabled",
      "isBlackListEnabled():(bool)",
      []
    );

    return result[0].toBoolean();
  }

  try_isBlackListEnabled(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isBlackListEnabled",
      "isBlackListEnabled():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isFeeEnabled(): boolean {
    let result = super.call("isFeeEnabled", "isFeeEnabled():(bool)", []);

    return result[0].toBoolean();
  }

  try_isFeeEnabled(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isFeeEnabled", "isFeeEnabled():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lensHub(): Address {
    let result = super.call("lensHub", "lensHub():(address)", []);

    return result[0].toAddress();
  }

  try_lensHub(): ethereum.CallResult<Address> {
    let result = super.tryCall("lensHub", "lensHub():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
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

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
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

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tld(): string {
    let result = super.call("tld", "tld():(string)", []);

    return result[0].toString();
  }

  try_tld(): ethereum.CallResult<string> {
    let result = super.tryCall("tld", "tld():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
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

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
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

  get _tld(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _lensHub(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _allowListmerkleRoot(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _blackListNameMerkleRoot(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class RegisterOwlIdCall extends ethereum.Call {
  get inputs(): RegisterOwlIdCall__Inputs {
    return new RegisterOwlIdCall__Inputs(this);
  }

  get outputs(): RegisterOwlIdCall__Outputs {
    return new RegisterOwlIdCall__Outputs(this);
  }
}

export class RegisterOwlIdCall__Inputs {
  _call: RegisterOwlIdCall;

  constructor(call: RegisterOwlIdCall) {
    this._call = call;
  }

  get _username(): string {
    return this._call.inputValues[0].value.toString();
  }

  get allowListProof(): Array<Bytes> {
    return this._call.inputValues[1].value.toBytesArray();
  }

  get blackListProof(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }
}

export class RegisterOwlIdCall__Outputs {
  _call: RegisterOwlIdCall;

  constructor(call: RegisterOwlIdCall) {
    this._call = call;
  }

  get recordID(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RegisterRestrictedNamesCall extends ethereum.Call {
  get inputs(): RegisterRestrictedNamesCall__Inputs {
    return new RegisterRestrictedNamesCall__Inputs(this);
  }

  get outputs(): RegisterRestrictedNamesCall__Outputs {
    return new RegisterRestrictedNamesCall__Outputs(this);
  }
}

export class RegisterRestrictedNamesCall__Inputs {
  _call: RegisterRestrictedNamesCall;

  constructor(call: RegisterRestrictedNamesCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _username(): string {
    return this._call.inputValues[1].value.toString();
  }

  get proof(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }
}

export class RegisterRestrictedNamesCall__Outputs {
  _call: RegisterRestrictedNamesCall;

  constructor(call: RegisterRestrictedNamesCall) {
    this._call = call;
  }

  get recordID(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
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

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SwitchIsAllowlistEnabledCall extends ethereum.Call {
  get inputs(): SwitchIsAllowlistEnabledCall__Inputs {
    return new SwitchIsAllowlistEnabledCall__Inputs(this);
  }

  get outputs(): SwitchIsAllowlistEnabledCall__Outputs {
    return new SwitchIsAllowlistEnabledCall__Outputs(this);
  }
}

export class SwitchIsAllowlistEnabledCall__Inputs {
  _call: SwitchIsAllowlistEnabledCall;

  constructor(call: SwitchIsAllowlistEnabledCall) {
    this._call = call;
  }

  get _isAllowListEnabled(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SwitchIsAllowlistEnabledCall__Outputs {
  _call: SwitchIsAllowlistEnabledCall;

  constructor(call: SwitchIsAllowlistEnabledCall) {
    this._call = call;
  }
}

export class SwitchIsBlackListEnabledCall extends ethereum.Call {
  get inputs(): SwitchIsBlackListEnabledCall__Inputs {
    return new SwitchIsBlackListEnabledCall__Inputs(this);
  }

  get outputs(): SwitchIsBlackListEnabledCall__Outputs {
    return new SwitchIsBlackListEnabledCall__Outputs(this);
  }
}

export class SwitchIsBlackListEnabledCall__Inputs {
  _call: SwitchIsBlackListEnabledCall;

  constructor(call: SwitchIsBlackListEnabledCall) {
    this._call = call;
  }

  get _isBlackListEnabled(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SwitchIsBlackListEnabledCall__Outputs {
  _call: SwitchIsBlackListEnabledCall;

  constructor(call: SwitchIsBlackListEnabledCall) {
    this._call = call;
  }
}

export class SwitchIsFeeEnabledCall extends ethereum.Call {
  get inputs(): SwitchIsFeeEnabledCall__Inputs {
    return new SwitchIsFeeEnabledCall__Inputs(this);
  }

  get outputs(): SwitchIsFeeEnabledCall__Outputs {
    return new SwitchIsFeeEnabledCall__Outputs(this);
  }
}

export class SwitchIsFeeEnabledCall__Inputs {
  _call: SwitchIsFeeEnabledCall;

  constructor(call: SwitchIsFeeEnabledCall) {
    this._call = call;
  }

  get _isFeeEnabled(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SwitchIsFeeEnabledCall__Outputs {
  _call: SwitchIsFeeEnabledCall;

  constructor(call: SwitchIsFeeEnabledCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
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

export class UpdateAllowlistMerkleRootCall extends ethereum.Call {
  get inputs(): UpdateAllowlistMerkleRootCall__Inputs {
    return new UpdateAllowlistMerkleRootCall__Inputs(this);
  }

  get outputs(): UpdateAllowlistMerkleRootCall__Outputs {
    return new UpdateAllowlistMerkleRootCall__Outputs(this);
  }
}

export class UpdateAllowlistMerkleRootCall__Inputs {
  _call: UpdateAllowlistMerkleRootCall;

  constructor(call: UpdateAllowlistMerkleRootCall) {
    this._call = call;
  }

  get _allowListmerkleRoot(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class UpdateAllowlistMerkleRootCall__Outputs {
  _call: UpdateAllowlistMerkleRootCall;

  constructor(call: UpdateAllowlistMerkleRootCall) {
    this._call = call;
  }
}

export class UpdateBlacklistNameMerkleRootCall extends ethereum.Call {
  get inputs(): UpdateBlacklistNameMerkleRootCall__Inputs {
    return new UpdateBlacklistNameMerkleRootCall__Inputs(this);
  }

  get outputs(): UpdateBlacklistNameMerkleRootCall__Outputs {
    return new UpdateBlacklistNameMerkleRootCall__Outputs(this);
  }
}

export class UpdateBlacklistNameMerkleRootCall__Inputs {
  _call: UpdateBlacklistNameMerkleRootCall;

  constructor(call: UpdateBlacklistNameMerkleRootCall) {
    this._call = call;
  }

  get _blackListNameMerkleRoot(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class UpdateBlacklistNameMerkleRootCall__Outputs {
  _call: UpdateBlacklistNameMerkleRootCall;

  constructor(call: UpdateBlacklistNameMerkleRootCall) {
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

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
