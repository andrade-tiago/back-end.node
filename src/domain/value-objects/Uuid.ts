import type { IUuidParser } from "@/domain/parsers/IUuidParser";

export class Uuid {
  private constructor(
    private readonly _value: UuidValue,
  ) {}

  public static create(value: UuidCreateValue, { parser }: UuidCreateDependencies): Uuid {
    if (value instanceof Uuid) {
      return new Uuid(value.value);
    }
    const parsedValue = parser.parse(value);

    return new Uuid(parsedValue);
  }
  public static unsafeCreate(value: UuidValue): Uuid {
    return new Uuid(value);
  }

  public get value() { return this._value; }
}

export type UuidValue = string

export type UuidCreateValue = string | Uuid

export type UuidCreateDependencies = {
  parser: IUuidParser;
}
