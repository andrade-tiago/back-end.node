import type { IParser } from "./__IParser";
import type { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";

export interface INonFutureDatetimeParser extends IParser<NonFutureDatetime['_value']> {}
