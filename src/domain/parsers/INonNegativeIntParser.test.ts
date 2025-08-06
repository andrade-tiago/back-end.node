import type { INonNegativeIntParser, NonNegativeIntParserInput } from "./INonNegativeIntParser";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => INonNegativeIntParser;
};

export function testNonNegativeIntParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - INonNegativeIntParser`, () =>
  {
    let instance: INonNegativeIntParser;

    beforeEach(() =>
    {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid non-negative integers', () =>
    {
      const validInputs: NonNegativeIntParserInput[] =
      [
        0,
        1,
        10,
        999_999,
        Number.MAX_SAFE_INTEGER,
      ];

      test.each(validInputs)('input: %d => output: %d', (input) =>
      {
        const result = instance.parse(input);

        expect(result).toBe(input);
      });
    });

    describe('should throw', () =>
    {
      describe('for negatives', () =>
      {
        const negativeInputs: NonNegativeIntParserInput[] = [
          -1,
          -100,
          -0.0001,
          Number.MIN_SAFE_INTEGER
        ];
  
        test.each(negativeInputs)('input: %d => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
  
      describe('for non-integers', () =>
      {
        const floatInputs: NonNegativeIntParserInput[] =
        [
          0.1,
          1.5,
          10.999
        ];
  
        test.each(floatInputs)('input: %d => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
  
      describe('for non-numerics', () =>
      {
        const invalidInputs: NonNegativeIntParserInput[] =
        [
          NaN,
          Infinity,
          -Infinity,
        ];
  
        test.each(invalidInputs)('input: %o => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}
