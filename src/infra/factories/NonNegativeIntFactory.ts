import { INonNegativeIntFactory } from "@/domain/factories/INonNegativeIntFactory";
import { INonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser";
import { NonNegativeIntCreateValue, NonNegativeInt } from "@/domain/value-objects/NonNegativeInt";

type FactoryDependencies = {
  nonNegativeIntParser: INonNegativeIntParser;
}

export class NonNegativeIntFactory implements INonNegativeIntFactory
{
  private readonly _nonNegativeIntParser: INonNegativeIntParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this._nonNegativeIntParser = dependencies.nonNegativeIntParser;
  }

  public create(value: NonNegativeIntCreateValue): NonNegativeInt
  {
    return NonNegativeInt.create(value, { parser: this._nonNegativeIntParser });
  }
}
