import type { IParser } from "./__IParser";
import type { FullNameValue } from "@/domain/value-objects/FullName";

export type FullNameInput = string

export interface IFullNameParser extends IParser<FullNameInput, FullNameValue> {}
