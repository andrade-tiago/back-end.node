import type { INonFutureDatetimeParser, NonFutureDatetimeParserInput } from "@/domain/parsers/INonFutureDatetimeParser";

export class NonFutureDatetime {
  private constructor(
    private readonly _value: NonFutureDatetimeValue,
  ) {}

  public static create(input: NonFutureDatetimeCreateValue, { parser }: NonFutureDatetimeCreateDependencies): NonFutureDatetime {
    if (input instanceof NonFutureDatetime) {
      return new NonFutureDatetime(input.value);
    }
    const parsedValue = parser.parse(input);

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

export type NonFutureDatetimeCreateValue = NonFutureDatetimeParserInput | NonFutureDatetime

export type NonFutureDatetimeCreateDependencies = {
  parser: INonFutureDatetimeParser;
}
