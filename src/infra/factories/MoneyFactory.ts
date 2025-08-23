import type { IMoneyFactory } from "@/domain/factories/IMoneyFactory";
import type { IMoneyParser } from "@/domain/parsers/IMoneyParser";
import { type MoneyCreateValue, Money } from "@/domain/value-objects/Money";

type FactoryDependencies = {
  moneyParser: IMoneyParser;
}

export class MoneyFactory implements IMoneyFactory
{
  private readonly _moneyParser: IMoneyParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this._moneyParser = dependencies.moneyParser;
  }

  public create(value: MoneyCreateValue): Money
  {
    return Money.create(value, { parser: this._moneyParser });
  }
}
