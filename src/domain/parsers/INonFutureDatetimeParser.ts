import type { IParser } from "./__IParser";
import type { NonFutureDatetime, NonFutureDatetimeCreateValue } from "@/domain/value-objects/NonFutureDatetime";

export interface INonFutureDatetimeParser extends IParser<NonFutureDatetimeCreateValue, NonFutureDatetime['_value']> {}
