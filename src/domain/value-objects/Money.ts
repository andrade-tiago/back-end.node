import type { IMoneyParser, MoneyParserInput } from "@/domain/parsers/IMoneyParser";

export class Money {
  private constructor(
    private readonly _value: MoneyValue,
  ) {}

  public static create(input: MoneyCreateValue, { parser }: MoneyCreateDependencies): Money {
    if (input instanceof Money) {
      return new Money(input.value);
    }
    const parsedValue = parser.parse(input);

    return new Money(parsedValue);
  }
  public static unsafeCreate(validValue: MoneyValue): Money {
    return new Money(validValue);
  }

  public get value() { return this._value; }
}

export type MoneyValue = number

export type MoneyCreateValue = MoneyParserInput | Money

export type MoneyCreateDependencies = {
  parser: IMoneyParser;
}
