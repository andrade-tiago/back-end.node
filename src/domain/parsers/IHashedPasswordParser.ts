import type { HashedPassword } from "@/domain/value-objects/HashedPassword";
import type { IParser } from "./__IParser";

export interface IHashedPasswordParser extends IParser<HashedPassword['_value']> {}
