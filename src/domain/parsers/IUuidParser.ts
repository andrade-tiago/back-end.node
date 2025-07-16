import type { IParser } from "./__IParser";
import type { Uuid, UuidCreateValue } from "@/domain/value-objects/Uuid";

export interface IUuidParser extends IParser<UuidCreateValue, Uuid['_value']> {}
