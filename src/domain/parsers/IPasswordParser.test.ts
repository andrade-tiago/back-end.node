import type { IPasswordParser, PasswordParserInput } from "./IPasswordParser";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => IPasswordParser;
};

export function testPasswordParser(opt: TestOptions) {
  describe(`${opt.getInstanceFunc().constructor.name} - IPasswordParser`, () => {
    let instance: IPasswordParser;

    beforeEach(() => {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid passwords', () => {
      const validUUIDs: string[] = [
        '5CCT#N.muvOchWj',
        'IZfrBy/8bZpB52U',
        '9Q8W@LEe0-foxTn',
      ];

      test.each(validUUIDs)('input: "%s" => should return it as is', (input) => {
        expect(instance.parse(input)).toBe(input);
      });
    });

    describe('should trim whitespace and parse correctly', () => {
      const inputsWithSpaces: Array<[string, string]> = [
        [' 5CCT#N.muvOchWj', '5CCT#N.muvOchWj'],
        ['IZfrBy/8bZpB52U ', 'IZfrBy/8bZpB52U'],
        [' 9Q8W@L e0-foxTn ', '9Q8W@L e0-foxTn'],
      ];

      test.each(inputsWithSpaces)('input: "%s" => should return: "%s"', (input, expected) => {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw', () =>
    {
      describe('for too short (-8 chars) passwords', () =>
      {
        const shortPasswords: PasswordParserInput[] =
        [
          'a1A$',
          '12Ab$%.',
          '123Aa%& ',
        ];

        test.each(shortPasswords)('input: "%s" => should throw', (input) => {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for too long (+24 chars) passwords', () =>
      {
        const longPasswords: PasswordParserInput[] =
        [
          'a1A$alshddjsk9wodldjsl234', // 25 chars
          'a1A$alshddjsk9wodldjsl234dnch/zxas', // 34 chars
          'a1A$alshddjsk9wodldjsl234dnch/zxas394923m09x1mslxkjda', // 53 chars
        ];

        test.each(longPasswords)('input: "%s" => should throw', (input) => {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for password with no lowercase letters', () =>
      {
        const passwordWithNoLowercase: PasswordParserInput[] =
        [
          'ASDHNCAKJC123$',
          '123192381238A#',
          'DINHHDXA6%',
        ];

        test.each(passwordWithNoLowercase)('input: "%s" => should throw', (input) => {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for password with no uppercase letters', () =>
      {
        const passwordWithNoUppercase: PasswordParserInput[] =
        [
          'lasdkajsldkajs123$',
          '123192381238a#',
          ',kajsla6%',
        ];

        test.each(passwordWithNoUppercase)('input: "%s" => should throw', (input) => {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for password with no numbers', () =>
      {
        const passwordWithNoNumbers: PasswordParserInput[] =
        [
          'lkasjdlkasALSK##$',
          'KSAJHDSAasd$',
          'JKDSHFKJDSAs@',
        ];

        test.each(passwordWithNoNumbers)('input: "%s" => should throw', (input) => {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for password with no especial characters', () =>
      {
        const passwordWithNoEspecialChars: PasswordParserInput[] =
        [
          'ASLKDJalskdj982173',
          'DALKJlkjsa43',
          'SASAsas3',
        ];

        test.each(passwordWithNoEspecialChars)('input: "%s" => should throw', (input) => {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}
