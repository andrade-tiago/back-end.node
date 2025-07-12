import type { INonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser";

export class NonNegativeInt {
  public static readonly ZERO = new NonNegativeInt(0);

  private constructor(
    private readonly _value: number,
  ) {}

  public static create(value: NonNegativeIntCreateValue, { parser }: NonNegativeIntCreateDependencies): NonNegativeInt {
    if (value instanceof NonNegativeInt) {
      return new NonNegativeInt(value.value);
    }
    const parsedValue = parser.parse(value);

    return new NonNegativeInt(parsedValue);
  }
  public static unsafeCreate(value: NonNegativeIntValue): NonNegativeInt {
    return new NonNegativeInt(value);
  }

  public get value() { return this._value; } 
}

export type NonNegativeIntValue = number

export type NonNegativeIntCreateValue = number | NonNegativeInt

export type NonNegativeIntCreateDependencies = {
  parser: INonNegativeIntParser;
}
