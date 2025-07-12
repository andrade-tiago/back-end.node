import type { FullName } from "@/domain/value-objects/FullName";
import type { IParser } from "./__IParser";

export interface IFullNameParser extends IParser<FullName['_value']> {}
