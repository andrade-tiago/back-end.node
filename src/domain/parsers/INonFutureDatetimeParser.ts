import type { IParser } from "./__IParser";
import type { NonFutureDatetimeValue } from "@/domain/value-objects/NonFutureDatetime";

export type NonFutureDatetimeParserInput = ConstructorParameters<typeof Date>[0]

export interface INonFutureDatetimeParser
  extends IParser<NonFutureDatetimeParserInput, NonFutureDatetimeValue> {}
