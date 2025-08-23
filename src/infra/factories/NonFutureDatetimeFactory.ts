import type { INonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory";
import type { INonFutureDatetimeParser } from "@/domain/parsers/INonFutureDatetimeParser";
import {
  type NonFutureDatetimeCreateValue,
  NonFutureDatetime
} from "@/domain/value-objects/NonFutureDatetime";

type FactoryDependencies = {
  nonFutureDatetimeParser: INonFutureDatetimeParser;
}

export class NonFutureDatetimeFactory implements INonFutureDatetimeFactory
{
  private readonly _nonFutureDatetimeParser: INonFutureDatetimeParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this._nonFutureDatetimeParser = dependencies.nonFutureDatetimeParser;
  }

  public create(datetime: NonFutureDatetimeCreateValue): NonFutureDatetime
  {
    return NonFutureDatetime.create(datetime, { parser: this._nonFutureDatetimeParser });
  }
}
