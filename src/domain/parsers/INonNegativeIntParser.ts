import { NonFutureDatetimeCreateValue } from "../value-objects/NonFutureDatetime";
import type { IParser } from "./__IParser";
import type { NonNegativeIntValue } from "@/domain/value-objects/NonNegativeInt";

export interface INonNegativeIntParser extends IParser<NonFutureDatetimeCreateValue, NonNegativeIntValue> {}
