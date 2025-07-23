import type { CpfParserInput, ICpfParser } from "./ICpfParser";
import type { CpfValue } from "@/domain/value-objects/CPF";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => ICpfParser;
}

export function testCpfParser(opt: TestOptions) {
  describe(`${opt.getInstanceFunc().constructor.name} - ICpfParser`, () => {
    let instance: ICpfParser;

    beforeEach(() => {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid unformatted CPFs correctly', () => {
      const validUnformattedCPFs: Array<[CpfParserInput, CpfValue]> = [
        ['12345678909', '12345678909'],
        ['98765432100', '98765432100'],
        ['45678901234', '45678901234'],
      ];

      test.each(validUnformattedCPFs)('input: "%s" => output: "%s"', (input, expected) => {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should parse valid formatted CPFs correctly', () => {
      const validFormattedCPFs: Array<[CpfParserInput, CpfValue]> = [
        ['123.456.789-09', '12345678909'],
        ['987.654.321-00', '98765432100'],
        ['456.789.012-34', '45678901234'],
      ];

      test.each(validFormattedCPFs)('input: "%s" => output: "%s"', (input, expected) => {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should trim leading and trailing spaces before parsing', () => {
      const cpfsWithSpaces: Array<[CpfParserInput, CpfValue]> = [
        [' 12345678909', '12345678909'],
        ['98765432100 ', '98765432100'],
        ['  456.789.012-34  ', '45678901234'],
      ];

      test.each(cpfsWithSpaces)('input: "%s" => output: "%s"', (input, expected) => {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw error for CPFs with invalid check digits', () => {
      const invalidDV: CpfParserInput[] = [
        '12345678900',
        '98765432199',
        '11111111112',
      ];

      test.each(invalidDV)('input: "%s" => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });

    describe('should throw error for incorrectly formatted CPFs', () => {
      const malformed: CpfParserInput[] = [
        '',
        ' ',
        '12345678',
        '123456789098',
        '12a.456.789-09',
        '123-456.789.09',
      ];

      test.each(malformed)('input: "%s" => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });

    describe('should throw error for known invalid sequences', () => {
      const repeatedSequences: CpfParserInput[] = [
        '00000000000',
        '11111111111',
        '99999999999',
      ];

      test.each(repeatedSequences)('input: "%s" => should throw', (input) => {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });
  });
}
