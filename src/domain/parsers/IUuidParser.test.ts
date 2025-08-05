import type { IUuidParser } from "./IUuidParser";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IUuidParser;
};

export function testUuidParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - IUuidParser`, () =>
  {
    let instance: IUuidParser;

    beforeEach(() =>
    {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid UUIDs', () =>
    {
      const validUUIDs: string[] =
      [
        '123e4567-e89b-12d3-a456-426614174000',
        '550e8400-e29b-41d4-a716-446655440000',
        '9e107d9d-372b-4d19-b35e-8329c1b1e3a0',
      ];

      test.each(validUUIDs)('input: "%s" => should return it as is', (input) =>
      {
        expect(instance.parse(input)).toBe(input);
      });
    });

    describe('should normalize uppercase UUIDs to lowercase', () =>
    {
      const upperCaseUUIDs: Array<[string, string]> =
      [
        ['123E4567-E89B-12D3-A456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
        ['550E8400-E29B-41D4-A716-446655440000', '550e8400-e29b-41d4-a716-446655440000'],
        ['9E107D9D-372B-4D19-B35E-8329C1B1E3A0', '9e107d9d-372b-4d19-b35e-8329c1b1e3a0'],
      ];

      test.each(upperCaseUUIDs)('input: "%s" => should return: "%s"', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should trim whitespaces', () =>
    {
      const inputsWithSpaces: Array<[string, string]> =
      [
        [' 123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
        ['550e8400-e29b-41d4-a716-446655440000 ', '550e8400-e29b-41d4-a716-446655440000'],
        [' 9e107d9d-372b-4d19-b35e-8329c1b1e3a0 ', '9e107d9d-372b-4d19-b35e-8329c1b1e3a0'],
      ];

      test.each(inputsWithSpaces)('input: "%s" => should return: %s', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw', () =>
    {
      describe('for invalid UUID formats', () =>
      {
        const invalidUUIDs: string[] =
        [
          '', // empty
          '123', // too short
          'not-a-uuid',
          '550e8400-e29b-41d4-a716-44665544', // incomplete
          'g50e8400-e29b-41d4-a716-446655440000', // invalid hex
          '123e4567e89b12d3a456426614174000', // missing hyphens
        ];
  
        test.each(invalidUUIDs)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}
