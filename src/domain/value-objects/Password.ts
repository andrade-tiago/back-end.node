import type { IPasswordParser, PasswordParserInput } from "@/domain/parsers/IPasswordParser";

export class Password {
  private constructor(
    private readonly _value: PasswordValue,
  ) {}

  public static create(input: PasswordCreateValue, { parser }: PositiveIntCreateDependencies): Password {
    if (input instanceof Password) {
      return new Password(input.value);
    }
    const parsedValue = parser.parse(input);

    return new Password(parsedValue);
  }
  public static unsafeCreate(validValue: PasswordValue): Password {
    return new Password(validValue);
  }

  public get value() { return this._value; }
}

export type PasswordValue = string

export type PasswordCreateValue = PasswordParserInput | Password

export type PositiveIntCreateDependencies = {
  parser: IPasswordParser;
}
