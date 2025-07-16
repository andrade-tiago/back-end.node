import type { IParser } from "./__IParser";
import type { HashedPassword, HashedPasswordCreateValue } from "@/domain/value-objects/HashedPassword";

export interface IHashedPasswordParser extends IParser<HashedPasswordCreateValue, HashedPassword['_value']> {}
