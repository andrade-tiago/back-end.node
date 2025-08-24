import type { IPasswordFactory } from "./IPasswordFactory";
import { Password, type PasswordCreateValue } from "@/domain/value-objects/Password";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockPassword } from "@/domain/value-objects/Password.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IPasswordFactory;
};

export function testPasswordFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IPasswordFactory`, () =>
  {
    let factoryInstance: IPasswordFactory;

    const fakePass1: Password = mockPassword();
    const fakePass2: Password = mockPassword();
    const invalidPassValue: PasswordCreateValue = faker.number.binary();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from an Password instance successfully', () =>
    {
      const result = factoryInstance.create(fakePass1);

      expect(result).toBeInstanceOf(Password);
      expect(result.value).toBe(fakePass1.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const result = factoryInstance.create(fakePass1.value);

      expect(result).toBeInstanceOf(Password);
      expect(result.value).toBe(fakePass1.value);
    });

    it('should throw for invalid full names', () =>
    {
      const spy = vi.spyOn(Password, 'create')
        .mockImplementation(() => { throw new InvalidDataError('') });

      expect(() => factoryInstance.create(invalidPassValue)).toThrow(InvalidDataError);

      spy.mockRestore();
    });

    it('should call Password.create internally', () =>
    {
      const spy = vi.spyOn(Password, 'create').mockReturnValue(fakePass2);
      const result = factoryInstance.create(fakePass1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakePass1);
      expect(result.value).toBe(fakePass2.value);

      spy.mockRestore();
    });
  });
}
