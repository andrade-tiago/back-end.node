import type { IParser } from "./__IParser";
import type { NonNegativeIntValue } from "@/domain/value-objects/NonNegativeInt";

export type NonNegativeIntParserInput = number

export interface INonNegativeIntParser
  extends IParser<NonNegativeIntParserInput, NonNegativeIntValue> {}
