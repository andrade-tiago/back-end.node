import type { IParser } from "./__IParser";
import type { FullName } from "@/domain/value-objects/FullName";

export interface IFullNameParser extends IParser<FullName['_value']> {}
