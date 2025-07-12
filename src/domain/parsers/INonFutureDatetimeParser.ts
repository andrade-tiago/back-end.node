import type { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";
import type { IParser } from "./__IParser";

export interface INonFutureDatetimeParser extends IParser<NonFutureDatetime['_value']> {}
