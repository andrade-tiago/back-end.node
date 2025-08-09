import type { IUserRoleParser, UserRoleParserInput } from "./IUserRoleParser";
import { UserRoleEnum } from "@/domain/enums/UserRoleEnum";
import { beforeEach, describe, expect, test } from "vitest";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => IUserRoleParser;
};

export function testUserRoleParser(opt: TestOptions)
{
  describe(`${opt.getInstanceFunc().constructor.name} - IUserRoleParser`, () =>
  {
    let instance: IUserRoleParser;

    beforeEach(() =>
    {
      instance = opt.getInstanceFunc();
    });

    describe('should parse valid user roles', () =>
    {
      const validInputs: Array<[UserRoleParserInput, UserRoleEnum]> =
      [
        ['user', UserRoleEnum.User],
        ['admin', UserRoleEnum.Admin],
        [UserRoleEnum.User, UserRoleEnum.User],
        [UserRoleEnum.Admin, UserRoleEnum.Admin],
      ];

      test.each(validInputs)('input: "%s" => output: %s', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should normalize input to lowercase before validating', () =>
    {
      const nonNormalizedInputs: Array<[string, UserRoleEnum]> =
      [
        ['USER', UserRoleEnum.User],
        ['AdMiN', UserRoleEnum.Admin],
      ];

      test.each(nonNormalizedInputs)('input: "%s" => output: %s', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should trim input and parse correctly', () =>
    {
      const inputsWithSpaces: Array<[UserRoleParserInput, UserRoleEnum]> =
      [
        ['  user', UserRoleEnum.User],
        ['admin  ', UserRoleEnum.Admin],
        ['  user  ', UserRoleEnum.User],
      ];

      test.each(inputsWithSpaces)('input: "%s" => output: %s', (input, expected) =>
      {
        expect(instance.parse(input)).toBe(expected);
      });
    });

    describe('should throw', () =>
    {
      describe('for invalid role strings', () =>
      {
        const invalidInputs: UserRoleParserInput[] =
        [
          '',
          'moderator',
          'superadmin',
          '123',
          'adm in',
          'userr',
        ];
  
        test.each(invalidInputs)('input: "%s" => should throw', (input) =>
        {
          expect(() => instance.parse(input)).toThrow(InvalidDataError);
        });
      });
    });
  });
}
