import type { INonFutureDatetimeParser, NonFutureDatetimeParserInput } from "./INonFutureDatetimeParser";
import type { NonFutureDatetimeValue } from "@/domain/value-objects/NonFutureDatetime";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => INonFutureDatetimeParser;
};

export function testNonFutureDatetimeParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - INonFutureDatetimeParser`, () =>
  {
    const MOCKED_NOW = new Date('2023-10-26T10:00:00.000Z');

    let instance: INonFutureDatetimeParser;

    beforeEach(() =>
    {
      vi.useFakeTimers();
      vi.setSystemTime(MOCKED_NOW);
      instance = opt.getInstanceFunc();
    });
    afterEach(() =>
    {
      vi.useRealTimers();
    });

    describe('should return valid non-future datetimes as ISO strings', () =>
    {
      const pastOrPresentDatetimes: Array<[NonFutureDatetimeParserInput, NonFutureDatetimeValue]> =
      [
        // Date objects
        [new Date('2023-10-26T09:59:59.000Z'), '2023-10-26T09:59:59.000Z'],
        [new Date('2023-10-26T10:00:00.000Z'), '2023-10-26T10:00:00.000Z'],
        [new Date('2022-01-01T00:00:00.000Z'), '2022-01-01T00:00:00.000Z'],

        // String inputs
        ['2023-10-26T09:59:00.000Z', '2023-10-26T09:59:00.000Z'],
        ['2020-05-15', '2020-05-15T03:00:00.000Z'],
        ['October 26, 2023 09:58:00 GMT-0300', '2023-10-26T12:58:00.000Z'],

        // Number inputs
        [MOCKED_NOW.getTime() - 1000, '2023-10-26T09:59:59.000Z'],
        [MOCKED_NOW.getTime(), '2023-10-26T10:00:00.000Z'],
      ];

      test.each(pastOrPresentDatetimes)('test: %s => %s', (input, expectedResult) =>
      {
        expect(instance.parse(input)).toBe(expectedResult);
      });
    });

    describe('should throw an error for future datetimes', () =>
    {
      const futureDatetimes: NonFutureDatetimeParserInput[] =
      [
        // Date objects
        new Date('2023-10-26T10:00:00.001Z'),
        new Date('2023-10-26T10:00:01.000Z'),
        new Date('2024-01-01T00:00:00.000Z'),

        // String inputs
        '2023-10-26T10:00:00.001Z',
        '2024-01-01',

        // Number inputs
        MOCKED_NOW.getTime() + 1,
        MOCKED_NOW.getTime() + 60000,
      ];

      test.each(futureDatetimes)('test: %s', (input) =>
      {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });

    describe('should throw an error for invalid input values', () =>
    {
      const invalidInputs: NonFutureDatetimeParserInput[] =
      [
        'invalid date string',
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        '999999999999999999999',
        new Date(Number.NaN),
      ];

      test.each(invalidInputs)('test: %s', (input) =>
      {
        expect(() => instance.parse(input)).toThrow(InvalidDataError);
      });
    });
  });
}
