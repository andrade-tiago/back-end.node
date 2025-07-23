import type { IMoneyParser, MoneyParserInput } from "./IMoneyParser";
import type { MoneyValue } from "@/domain/value-objects/Money";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => IMoneyParser;
};

export function testMoneyParser(opt: TestOptions) {
  describe(`${opt.getInstanceFunc().constructor.name} - IMoneyParser`, () => {
    let instance: IMoneyParser;

    beforeEach(() => {
      instance = opt.getInstanceFunc();
    });

    describe('should accept positive numbers with up to two decimal places', () => {
      const validInputs: Array<[MoneyParserInput, MoneyValue]> = [
        [1, 1],
        [10.5, 10.5],
        [99.99, 99.99],
      ];

      test.each(validInputs)('input: %s => output: %s', (input, expected) => {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should round or truncate numbers with more than two decimal places', () => {
      const inputsWithMoreDecimals: Array<[MoneyParserInput, MoneyValue]> = [
        [10.555, 10.56],
        [99.999, 100.00],
        [5.6789, 5.68],
      ];

      test.each(inputsWithMoreDecimals)('input: %s => output: %s', (input, expected) => {
        expect(instance.parse(input)).toBeCloseTo(expected, 2);
      });
    });

    describe('should throw error for zero or negative values', () => {
      const nonPositiveInputs: MoneyParserInput[] = [
        0,
        -0.01,
        -10,
        0.001, // should be rounded to 0
      ];

      test.each(nonPositiveInputs)('input: %s => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });

    describe('should throw error for NaN or Infinity values', () => {
      const invalidNumbers: MoneyParserInput[] = [
        NaN,
        Infinity,
        -Infinity,
      ];

      test.each(invalidNumbers)('input: %s => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });
  });
}
