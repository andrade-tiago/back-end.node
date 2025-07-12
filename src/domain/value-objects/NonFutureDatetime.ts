import type { INonFutureDatetimeParser } from "@/domain/parsers/INonFutureDatetimeParser";

export class NonFutureDatetime {
  private constructor(
    private readonly _value: NonFutureDatetimeValue,
  ) {}

  public static create(value: NonFutureDatetimeCreateValue, { parser }: NonFutureDatetimeCreateDependencies): NonFutureDatetime {
    if (value instanceof NonFutureDatetime) {
      return new NonFutureDatetime(value.value);
    }
    const parsedValue = parser.parse(value);

    return new NonFutureDatetime(parsedValue);
  }
  public static unsafeCreate(value: NonFutureDatetimeValue): NonFutureDatetime {
    return new NonFutureDatetime(value);
  }
  public static now() {
    return new NonFutureDatetime(new Date().toISOString());
  }

  public get value() { return this._value; }

  public toDate(): Date {
    return new Date(this._value);
  }
}

export type NonFutureDatetimeValue = ReturnType<Date['toISOString']>

export type NonFutureDatetimeCreateValue = ConstructorParameters<typeof Date>[0] | NonFutureDatetime

export type NonFutureDatetimeCreateDependencies = {
  parser: INonFutureDatetimeParser;
}
