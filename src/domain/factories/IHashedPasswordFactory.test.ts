import type { IHashedPasswordFactory } from "./IHashedPasswordFactory";
import type { Password, PasswordCreateValue } from "@/domain/value-objects/Password";
import { HashedPassword, HashedPasswordCreateValue } from "@/domain/value-objects/HashedPassword";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockHashedPassword } from "@/domain/value-objects/HashedPassword.mock";
import { mockPassword } from "@/domain/value-objects/Password.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IHashedPasswordFactory;
};

export function testHashedPasswordFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IHashedPasswordFactory`, () =>
  {
    let factoryInstance: IHashedPasswordFactory;

    const fakeHash1: HashedPassword = mockHashedPassword();
    const fakeHash2: HashedPassword = mockHashedPassword();
    const fakePass: Password = mockPassword();
    const invalidPass: PasswordCreateValue = faker.color.human();
    const invalidHash: HashedPasswordCreateValue = faker.color.human();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from an HashedPassword instance using fromHash', () =>
    {
      const result = factoryInstance.fromHash(fakeHash1);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);
    });

    it('should be created from a Password instance using fromPlain', async () =>
    {
      const result = await factoryInstance.fromPlain(fakePass);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);
    });

    it('should be created from a hash string value using fromHash', () =>
    {
      const result = factoryInstance.fromHash(fakeHash1.value);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);
    });

    it('should be created from a plain string using fromPlain', async () =>
    {
      const result = await factoryInstance.fromPlain(fakePass.value);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.fromPlain(invalidPass)).toThrow(InvalidDataError);
      expect(() => factoryInstance.fromHash(invalidHash)).toThrow(InvalidDataError);
    });

    it('should call HashedPassword.create internally', () =>
    {
      const spy = vi.spyOn(HashedPassword, 'create').mockReturnValue(fakeHash2);
      const result = factoryInstance.fromHash(fakeHash1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeHash1);
      expect(result.value).toBe(fakeHash2.value);

      spy.mockRestore();
    });
  });
}
