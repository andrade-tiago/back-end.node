import type { IParser } from "./__IParser";
import type { HashedPassword } from "@/domain/value-objects/HashedPassword";

export interface IHashedPasswordParser extends IParser<HashedPassword['_value']> {}
