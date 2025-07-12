import type { IMoneyParser } from "@/domain//parsers/IMoneyParser"

export class Money {
  private constructor(
    private readonly _value: MoneyValue,
  ) {}

  public static create(value: MoneyCreateValue, { parser }: MoneyCreateDependencies): Money {
    if (value instanceof Money) {
      return new Money(value.value);
    }
    const parsedValue = parser.parse(value);

    return new Money(parsedValue);
  }
  public static unsafeCreate(value: MoneyValue): Money {
    return new Money(value);
  }

  public get value() { return this._value; }
}

export type MoneyValue = number

export type MoneyCreateValue = number | Money

export type MoneyCreateDependencies = {
  parser: IMoneyParser;
}
