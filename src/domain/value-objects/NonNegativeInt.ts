import type { INonNegativeIntParser, NonNegativeIntParserInput } from "@/domain/parsers/INonNegativeIntParser";

export class NonNegativeInt {
  public static readonly ZERO = new NonNegativeInt(0);

  private constructor(
    private readonly _value: NonNegativeIntValue,
  ) {}

  public static create(input: NonNegativeIntCreateValue, { parser }: NonNegativeIntCreateDependencies): NonNegativeInt {
    if (input instanceof NonNegativeInt) {
      return new NonNegativeInt(input.value);
    }
    const parsedValue = parser.parse(input);

    return new NonNegativeInt(parsedValue);
  }
  public static unsafeCreate(validValue: NonNegativeIntValue): NonNegativeInt {
    return new NonNegativeInt(validValue);
  }

  public get value() { return this._value; } 
}

export type NonNegativeIntValue = number

export type NonNegativeIntCreateValue = NonNegativeIntParserInput | NonNegativeInt

export type NonNegativeIntCreateDependencies = {
  parser: INonNegativeIntParser;
}
