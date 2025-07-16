import type { IParser } from "./__IParser";
import type { FullName, FullNameCreateValue } from "@/domain/value-objects/FullName";

export interface IFullNameParser extends IParser<FullNameCreateValue, FullName['_value']> {}
