import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { INonFutureDateFactory } from "../non-future-date.factory";

export class NonFutureDateFactory implements INonFutureDateFactory {
  public create(datetime?: ConstructorParameters<typeof NonFutureDate>[0]): NonFutureDate {
    return new NonFutureDate(datetime);
  }
}
