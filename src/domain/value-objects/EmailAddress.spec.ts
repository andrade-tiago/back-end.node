import type { EmailAddressParserInput, IEmailAddressParser } from "@/domain/parsers/IEmailAddressParser";
import { EmailAddress, type EmailAddressValue } from "./EmailAddress";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InvalidDataError } from "@/domain/errors";
import { faker } from "@faker-js/faker";

describe('EmailAddress Value Object', () =>
{
  const validTestInput: EmailAddressParserInput = faker.internet.email();
  const invalidTestInput: EmailAddressParserInput = faker.string.numeric();
  const testParserOutput: EmailAddressValue = faker.internet.email();

  let parser: IEmailAddressParser;

  beforeEach(() =>
  {
    parser =
    {
      parse: vi.fn<IEmailAddressParser['parse']>((value) =>
      {
        if (value === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid email');
      }),
    };
  });

  it('should create EmailAddress using parser', () =>
  {
    const email = EmailAddress.create(validTestInput, { parser });
    expect(email).toBeInstanceOf(EmailAddress);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(email.value).toBe(testParserOutput);
  });

  it('should return new instance if EmailAddress is passed to create()', () =>
  {
    const original = EmailAddress.unsafeCreate(validTestInput);
    const result = EmailAddress.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => EmailAddress.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const email = EmailAddress.unsafeCreate(validTestInput);

    expect(email).toBeInstanceOf(EmailAddress);
    expect(email.value).toBe(validTestInput);
  });
});
