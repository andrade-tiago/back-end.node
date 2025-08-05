import type { EmailAddressParserInput, IEmailAddressParser } from "./IEmailAddressParser";
import type { EmailAddressValue } from "@/domain/value-objects/EmailAddress";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IEmailAddressParser;
};

export function testEmailParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - IEmailAddressParser`, () =>
  {
    let instance: IEmailAddressParser;

    beforeEach(() =>
    {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid email addresses correctly', () =>
    {
      const validEmails: Array<[EmailAddressParserInput, EmailAddressValue]> =
      [
        ['john.doe@example.com', 'john.doe@example.com'],
        ['JOHN.DOE@EXAMPLE.COM', 'john.doe@example.com'],
        ['jane_doe123@sub.domain.org', 'jane_doe123@sub.domain.org'],
      ];

      test.each(validEmails)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should normalize email to lowercase', () =>
    {
      const emailsToNormalize: Array<[EmailAddressParserInput, EmailAddressValue]> =
      [
        ['John.Doe@Example.com', 'john.doe@example.com'],
        ['ALICE@MAIL.COM', 'alice@mail.com'],
        ['BOB.SMITH@SERVER.NET', 'bob.smith@server.net'],
      ];

      test.each(emailsToNormalize)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should trim spaces', () =>
    {
      const emailsToTrimSpaces: Array<[EmailAddressParserInput, EmailAddressValue]> = [
        ['  john.doe@example.com', 'john.doe@example.com'],
        ['john.doe@example.com  ', 'john.doe@example.com'],
        [' john.doe@example.com ', 'john.doe@example.com']
      ];

      test.each(emailsToTrimSpaces)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw', () =>
    {
      describe('for invalid email formats', () =>
      {
        const invalidEmails: EmailAddressParserInput[] =
        [
          '',
          ' ',
          'plainaddress',
          '@no-local-part.com',
          'missing-at-symbol.com',
          'missingdomain@',
          'user@@domain.com',
          'user@.com',
          'user@domain..com',
        ];

        test.each(invalidEmails)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for disallowed characters', () =>
      {
        const malformedEmails: EmailAddressParserInput[] =
        [
          'john doe@example.com',
          'user@ex ample.com',
          'user@domain!.com',
          'user@#$.com',
        ];

        test.each(malformedEmails)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}