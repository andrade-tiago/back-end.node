import type { IParser } from "./__IParser";
import type { PositiveIntValue } from "@/domain/value-objects/PositiveInt";

export type PositiveIntParserInput = number

export interface IPositiveIntParser
  extends IParser<PositiveIntParserInput, PositiveIntValue> {}
