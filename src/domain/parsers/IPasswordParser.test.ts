import type { IPasswordParser } from "./IPasswordParser";
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

      test.each(inputsWithSpaces)('input: "%s" => should return: %s', (input, expected) => {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw for invalid password formats', () => {
      const invalidPasswords: string[] = [
        '', // empty
        '123', // too short
        '12-4567A', // no lowercase letters
        '12-4567a', // no uppercase letters
        '1234567a', // no especial chars
        'abc$efg%', // no numbers
      ];

      test.each(invalidPasswords)('input: "%s" => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });
  });
}
