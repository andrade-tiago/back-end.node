import type { IParser } from "./__IParser";
import type { HashedPasswordValue } from "@/domain/value-objects/HashedPassword";

export type HashedPasswordParserInput = string

export interface IHashedPasswordParser extends IParser<HashedPasswordParserInput, HashedPasswordValue> {}
