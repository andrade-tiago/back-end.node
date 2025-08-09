import type { IEmailAddressFactory } from "./IEmailAddressFactory";
import { EmailAddress } from "@/domain/value-objects/EmailAddress";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockEmailAddress } from "@/domain/value-objects/EmailAddress.mock";

type TestOptions =
{
  getInstanceFunc: () => IEmailAddressFactory;
};

export function testEmailAddressFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IEmailAddressFactory`, () =>
  {
    let factoryInstance: IEmailAddressFactory;

    const fakeEmail1: EmailAddress = mockEmailAddress();
    const fakeEmail2: EmailAddress = mockEmailAddress();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from an EmailAddress instance successfully', () =>
    {
      const result = factoryInstance.create(fakeEmail1);

      expect(result).toBeInstanceOf(EmailAddress);
      expect(result.value).toBe(fakeEmail1.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const result = factoryInstance.create(fakeEmail1.value);

      expect(result).toBeInstanceOf(EmailAddress);
      expect(result.value).toBe(fakeEmail1.value);
    });

    it('should call EmailAddress.create internally', () =>
    {
      const spy = vi.spyOn(EmailAddress, 'create').mockReturnValue(fakeEmail2);
      const result = factoryInstance.create(fakeEmail1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeEmail1);
      expect(result.value).toBe(fakeEmail2.value);

      spy.mockRestore();
    });
  });
}
