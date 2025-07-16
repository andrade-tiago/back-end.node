import type { IUuidParser, UuidParserInput } from "@/domain/parsers/IUuidParser";

export class Uuid {
  private constructor(
    private readonly _value: UuidValue,
  ) {}

  public static create(input: UuidCreateValue, { parser }: UuidCreateDependencies): Uuid {
    if (input instanceof Uuid) {
      return new Uuid(input.value);
    }
    const parsedValue = parser.parse(input);

    return new Uuid(parsedValue);
  }
  public static unsafeCreate(validValue: UuidValue): Uuid {
    return new Uuid(validValue);
  }

  public get value() { return this._value; }
}

export type UuidValue = string

export type UuidCreateValue = UuidParserInput | Uuid

export type UuidCreateDependencies = {
  parser: IUuidParser;
}
