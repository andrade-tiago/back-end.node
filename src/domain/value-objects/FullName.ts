import type { FullNameInput, IFullNameParser } from "@/domain/parsers/IFullNameParser";

export class FullName {
  private constructor(
    private readonly _value: FullNameValue,
  ) {}

  public static create(input: FullNameCreateValue, { parser }: FullNameCreateDependencies): FullName {
    if (input instanceof FullName) {
      return new FullName(input.value);
    }
    const parsedValue = parser.parse(input);

    return new FullName(parsedValue);
  }
  public static unsafeCreate(validValue: FullNameValue): FullName {
    return new FullName(validValue);
  }

  public get value() { return this._value; }
}

export type FullNameValue = string

export type FullNameCreateValue = FullNameInput | FullName

export type FullNameCreateDependencies = {
  parser: IFullNameParser;
}
