import type { INonFutureDatetimeFactory } from "./INonFutureDatetimeFactory";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";

export const mockNonFutureDatetimeFactory = (): INonFutureDatetimeFactory =>
{
  return {
    create: value => value instanceof NonFutureDatetime
      ? value
      : NonFutureDatetime.unsafeCreate( new Date(value).toISOString() ),
  };
};
