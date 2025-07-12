import type { IFullNameParser } from "@/domain/parsers/IFullNameParser";

export class FullName {
  private constructor(
    private readonly _value: FullNameValue,
  ) {}

  public static create(value: FullNameCreateValue, { parser }: FullNameCreateDependencies): FullName {
    if (value instanceof FullName) {
      return new FullName(value.value);
    }
    const parsedValue = parser.parse(value);

    return new FullName(parsedValue);
  }
  public static unsafeCreate(value: FullNameValue): FullName {
    return new FullName(value);
  }

  public get value() { return this._value; }
}

export type FullNameValue = string

export type FullNameCreateValue = string | FullName

export type FullNameCreateDependencies = {
  parser: IFullNameParser;
}
