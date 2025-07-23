import type { IPositiveIntParser, PositiveIntParserInput } from "./IPositiveIntParser";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => IPositiveIntParser;
};

export function testPositiveIntParser(opt: TestOptions) {
  describe(`${opt.getInstanceFunc().constructor.name} - IPositiveIntParser`, () => {
    let instance: IPositiveIntParser;

    beforeEach(() => {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid positive integers', () => {
      const validInputs: PositiveIntParserInput[] = [
        1,
        2,
        10,
        999_999,
        Number.MAX_SAFE_INTEGER
      ];

      test.each(validInputs)('input: %d => output: %d', (input) => {
        const result = instance.parse(input);
        expect(result).toBe(input);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThan(0);
      });
    });

    describe('should throw error for zero', () => {
      test('input: 0 => should throw', () => {
        expect(() => instance.parse(0)).toThrow(InvalidDataError);
      });
    });

    describe('should throw error for negative numbers', () => {
      const negativeInputs: PositiveIntParserInput[] = [
        -1,
        -100,
        -0.0001,
        Number.MIN_SAFE_INTEGER,
      ];

      test.each(negativeInputs)('input: %d => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });

    describe('should throw error for non-integers', () => {
      const floatInputs: PositiveIntParserInput[] = [
        0.1,
        1.5,
        10.999,
      ];

      test.each(floatInputs)('input: %d => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });

    describe('should throw error for non-numeric or invalid values', () => {
      const invalidInputs: any[] = [
        NaN,
        Infinity,
        -Infinity,
      ];

      test.each(invalidInputs)('input: %o => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });
  });
}
