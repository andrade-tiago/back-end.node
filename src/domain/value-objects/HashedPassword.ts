import type { IHashedPasswordParser } from "@/domain/parsers/IHashedPasswordParser";

export class HashedPassword {
  private constructor(
    private readonly _value: HashedPasswordValue,
  ) {}

  public static create(value: HashedPasswordCreateValue, { parser }: HashedPasswordCreateDependencies): HashedPassword {
    if (value instanceof HashedPassword) {
      return new HashedPassword(value.value);
    }
    const parsedValue = parser.parse(value);

    return new HashedPassword(parsedValue);
  }
  public static unsafeCreate(value: HashedPasswordValue): HashedPassword {
    return new HashedPassword(value);
  }

  public get value() { return this._value; }
}

export type HashedPasswordValue = string

export type HashedPasswordCreateValue = string | HashedPassword

export type HashedPasswordCreateDependencies = {
  parser: IHashedPasswordParser;
}
