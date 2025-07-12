import type { IEmailParser } from "@/domain/parsers/IEmailAddressParser";

export class EmailAddress {
  private constructor(
    private readonly _value: EmailAddressValue,
  ) {}

  public static create(value: EmailAddressCreateValue, { parser }: EmailAddressCreateDependencies): EmailAddress {
    if (value instanceof EmailAddress) {
      return new EmailAddress(value.value);
    }
    const parsedValue = parser.parse(value);

    return new EmailAddress(parsedValue);
  }
  public static unsafeCreate(value: EmailAddressValue): EmailAddress {
    return new EmailAddress(value);
  }

  public get value() { return this._value; }
}

export type EmailAddressValue = string

export type EmailAddressCreateValue = string | EmailAddress

export type EmailAddressCreateDependencies = {
  parser: IEmailParser;
}
