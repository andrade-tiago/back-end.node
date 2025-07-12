import type { IPositiveIntParser } from "@/domain/parsers/IPositiveIntParser";

export class PositiveInt {
  public static readonly ONE = new PositiveInt(1);

  private constructor(
    private readonly _value: PositiveIntValue,
  ) {}

  public static create(value: PositiveIntCreateValue, { parser }: PositiveIntCreateDependencies): PositiveInt {
    if (value instanceof PositiveInt) {
      return new PositiveInt(value.value);
    }
    const parsedValue = parser.parse(value);

    return new PositiveInt(parsedValue);
  }
  public static unsafeCreate(value: PositiveIntValue): PositiveInt {
    return new PositiveInt(value);
  }

  public get value() { return this._value; }
}

export type PositiveIntValue = number

export type PositiveIntCreateValue = number | PositiveInt

export type PositiveIntCreateDependencies = {
  parser: IPositiveIntParser;
}
