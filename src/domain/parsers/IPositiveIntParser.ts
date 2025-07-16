import type { IParser } from "./__IParser";
import type { PositiveIntCreateValue, PositiveIntValue } from "@/domain/value-objects/PositiveInt";

export interface IPositiveIntParser extends IParser<PositiveIntCreateValue, PositiveIntValue> {}
