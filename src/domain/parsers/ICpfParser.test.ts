import type { CpfParserInput, ICpfParser } from "./ICpfParser";
import type { CpfValue } from "@/domain/value-objects/CPF";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => ICpfParser;
}

export function testCpfParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - ICpfParser`, () =>
  {
    let instance: ICpfParser;

    beforeEach(() =>
    {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid unformatted CPFs correctly', () =>
    {
      const validUnformattedCPFs: Array<[CpfParserInput, CpfValue]> =
      [
        ['60976744066', '60976744066'],
        ['83017873099', '83017873099'],
        ['01664046089', '01664046089'],
      ];

      test.each(validUnformattedCPFs)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should remove formatting of CPFs', () =>
    {
      const validFormattedCPFs: Array<[CpfParserInput, CpfValue]> =
      [
        ['488.763.300-97', '48876330097'],
        ['987.654.321-00', '98765432100'],
        ['737.454.380-86', '73745438086'],
      ];

      test.each(validFormattedCPFs)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should trim spaces', () =>
    {
      const CPFsWithSpaces: Array<[CpfParserInput, CpfValue]> =
      [
        [' 73832788018', '73832788018'],
        ['73832788018 ', '73832788018'],
        ['  738.327.880-18  ', '73832788018'],
      ];

      test.each(CPFsWithSpaces)('input: "%s" => output: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw', () =>
    {
      describe('for CPFs with invalid check digits', () =>
      {
        const invalidVD: CpfParserInput[] =
        [
          '12345678900',
          '98765432199',
          '11111111112',
        ];
  
        test.each(invalidVD)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for incorrectly formatted CPFs', () =>
      {
        const malformed: CpfParserInput[] =
        [
          '',
          ' ',
          '12345678',
          '123456789098',
          '12a.456.789-09',
        ];
  
        test.each(malformed)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });

      describe('for known invalid sequences', () =>
      {
        const repeatedSequences: CpfParserInput[] =
        [
          '00000000000',
          '11111111111',
          '99999999999',
        ];
  
        test.each(repeatedSequences)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}
