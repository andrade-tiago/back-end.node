import type { IHashedPasswordFactory } from "./IHashedPasswordFactory";
import type { Password } from "@/domain/value-objects/Password";
import { HashedPassword } from "@/domain/value-objects/HashedPassword";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockHashedPassword } from "@/domain/value-objects/HashedPassword.mock";
import { mockPassword } from "@/domain/value-objects/Password.mock";

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
      const spy = vi.spyOn(HashedPassword, 'fromPassword')
        .mockReturnValue(Promise.resolve(fakeHash1));

      const result = await factoryInstance.fromPlain(fakePass);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);

      spy.mockRestore();
    });

    it('should be created from a hash string value using fromHash', () =>
    {
      const result = factoryInstance.fromHash(fakeHash1.value);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);
    });

    it('should be created from a plain string using fromPlain', async () =>
    {
      const spy = vi.spyOn(HashedPassword, 'fromPassword')
        .mockReturnValue(Promise.resolve(fakeHash1));

      const result = await factoryInstance.fromPlain(fakePass.value);

      expect(result).toBeInstanceOf(HashedPassword);
      expect(result.value).toBe(fakeHash1.value);

      spy.mockRestore();
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
