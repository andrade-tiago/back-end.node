import type { EmailAddressParserInput, IEmailParser } from "@/domain/parsers/IEmailAddressParser";

export class EmailAddress {
  private constructor(
    private readonly _value: EmailAddressValue,
  ) {}

  public static create(input: EmailAddressCreateValue, { parser }: EmailAddressCreateDependencies): EmailAddress {
    if (input instanceof EmailAddress) {
      return new EmailAddress(input.value);
    }
    const parsedValue = parser.parse(input);

    return new EmailAddress(parsedValue);
  }
  public static unsafeCreate(validValue: EmailAddressValue): EmailAddress {
    return new EmailAddress(validValue);
  }

  public get value() { return this._value; }
}

export type EmailAddressValue = string

export type EmailAddressCreateValue = EmailAddressParserInput | EmailAddress

export type EmailAddressCreateDependencies = {
  parser: IEmailParser;
}
