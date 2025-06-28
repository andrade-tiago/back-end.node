import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

export interface INonFutureDateFactory {
  create(datetime?: ConstructorParameters<typeof NonFutureDate>[0]): NonFutureDate;
}
