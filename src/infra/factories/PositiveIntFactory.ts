import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";
import type { IPositiveIntParser } from "@/domain/parsers/IPositiveIntParser";
import { type PositiveIntCreateValue, PositiveInt } from "@/domain/value-objects/PositiveInt";

type FactoryDependencies = {
  positiveIntParser: IPositiveIntParser; 
}

export class PositiveIntFactory implements IPositiveIntFactory
{
  private readonly _positiveIntParser: IPositiveIntParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this._positiveIntParser = dependencies.positiveIntParser;
  }

  public create(value: PositiveIntCreateValue): PositiveInt
  {
    return PositiveInt.create(value, { parser: this._positiveIntParser });
  }
}
