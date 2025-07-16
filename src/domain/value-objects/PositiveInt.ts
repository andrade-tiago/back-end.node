import type { IPositiveIntParser, PositiveIntParserInput } from "@/domain/parsers/IPositiveIntParser";

export class PositiveInt {
  public static readonly ONE = new PositiveInt(1);

  private constructor(
    private readonly _value: PositiveIntValue,
  ) {}

  public static create(input: PositiveIntCreateValue, { parser }: PositiveIntCreateDependencies): PositiveInt {
    if (input instanceof PositiveInt) {
      return new PositiveInt(input.value);
    }
    const parsedValue = parser.parse(input);

    return new PositiveInt(parsedValue);
  }
  public static unsafeCreate(validValue: PositiveIntValue): PositiveInt {
    return new PositiveInt(validValue);
  }

  public get value() { return this._value; }
}

export type PositiveIntValue = number

export type PositiveIntCreateValue = PositiveIntParserInput | PositiveInt

export type PositiveIntCreateDependencies = {
  parser: IPositiveIntParser;
}
