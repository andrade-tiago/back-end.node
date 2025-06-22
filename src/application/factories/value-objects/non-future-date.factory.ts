import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

export interface INonFutureDateFactory {
  create(datetime?: Parameters<typeof NonFutureDate.create>[0]): NonFutureDate;
}
