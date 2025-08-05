import type { HashedPasswordParserInput, IHashedPasswordParser } from "./IHashedPasswordParser";
import type { HashedPasswordValue } from "@/domain/value-objects/HashedPassword";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IHashedPasswordParser;
};

export function testHashedPasswordParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - IHashedPasswordParser`, () =>
  {
    let instance: IHashedPasswordParser;

    beforeEach(() => {
      instance = opt.getInstanceFunc();
    });

    describe('should accept valid bcrypt hashes', () =>
    {
      const validHashes: Array<[HashedPasswordParserInput, HashedPasswordValue]> =
      [
        ['$2a$10$8sHfpIiXAMdO2Nq9xW7U0e7rXlYKaQu0BAdfQoAE1uRoJfyhZo9lK', '$2a$10$8sHfpIiXAMdO2Nq9xW7U0e7rXlYKaQu0BAdfQoAE1uRoJfyhZo9lK'],
        ['$2b$12$uY/TMfZElwGx0rbEOaWJgOxWCTsmWZcEwzzP5IDOpHNP7ISFhLFBa', '$2b$12$uY/TMfZElwGx0rbEOaWJgOxWCTsmWZcEwzzP5IDOpHNP7ISFhLFBa'],
        ['$2y$08$2sBzGZqvC1gA4HxWxG5QuOhOBBknY2UNzWh9dGzO9BgtoEa7jKnle', '$2y$08$2sBzGZqvC1gA4HxWxG5QuOhOBBknY2UNzWh9dGzO9BgtoEa7jKnle'],
      ];

      test.each(validHashes)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should trim whitespaces', () =>
    {
      const hashWithSpaces: Array<[HashedPasswordParserInput, HashedPasswordValue]> =
      [
        ['  $2a$10$8sHfpIiXAMdO2Nq9xW7U0e7rXlYKaQu0BAdfQoAE1uRoJfyhZo9lK  ', '$2a$10$8sHfpIiXAMdO2Nq9xW7U0e7rXlYKaQu0BAdfQoAE1uRoJfyhZo9lK'],
      ];

      test.each(hashWithSpaces)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw', () =>
    {
      describe('for non-bcrypt hashes or invalid strings', () =>
      {
        const invalidInputs: HashedPasswordParserInput[] =
        [
          '',
          'notahash',
          '$1$something...invalid',
          '$2a$10$short',
          '2a$10$malformedhashwithoutprefix',
          ' '.repeat(60),
        ];
  
        test.each(invalidInputs)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
  
      describe('for hashes with incorrect length', () =>
      {
        const wrongLengthHashes: HashedPasswordParserInput[] =
        [
          '$2a$10$' + 'a'.repeat(30), // too short
          '$2b$10$' + 'a'.repeat(80), // too long
        ];
  
        test.each(wrongLengthHashes)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
  
      describe('for unsupported bcrypt version', () =>
      {
        const unsupportedVersions: HashedPasswordParserInput[] =
        [
          '$2x$10$8sHfpIiXAMdO2Nq9xW7U0e7rXlYKaQu0BAdfQoAE1uRoJfyhZo9lK', // invalid version
          '$3a$10$invalidbutlookslikebcryptstring0000000000000000000000',
        ];
  
        test.each(unsupportedVersions)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}
