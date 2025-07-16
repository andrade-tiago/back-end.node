import type { IParser } from "./__IParser";
import type { UuidValue } from "@/domain/value-objects/Uuid";

export type UuidParserInput = string

export interface IUuidParser extends IParser<UuidParserInput, UuidValue> {}
