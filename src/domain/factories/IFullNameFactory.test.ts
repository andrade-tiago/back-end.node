import type { IFullNameFactory } from "./IFullNameFactory";
import { FullName, type FullNameCreateValue } from "@/domain/value-objects/FullName";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockFullName } from "@/domain/value-objects/FullName.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IFullNameFactory;
};

export function testFullNameFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IFullNameFactory`, () =>
  {
    let factoryInstance: IFullNameFactory;

    const fakeName1: FullName = mockFullName();
    const fakeName2: FullName = mockFullName();
    const invalidName: FullNameCreateValue = faker.lorem.text();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from an FullName instance successfully', () =>
    {
      const result = factoryInstance.create(fakeName1);

      expect(result).toBeInstanceOf(FullName);
      expect(result.value).toBe(fakeName1.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const result = factoryInstance.create(fakeName1.value);

      expect(result).toBeInstanceOf(FullName);
      expect(result.value).toBe(fakeName1.value);
    });

    it('should throw for invalid full names', () =>
    {
      expect(() => factoryInstance.create(invalidName)).toThrow(InvalidDataError);
    });

    it('should call FullName.create internally', () =>
    {
      const spy = vi.spyOn(FullName, 'create').mockReturnValue(fakeName2);
      const result = factoryInstance.create(fakeName1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeName1);
      expect(result.value).toBe(fakeName2.value);

      spy.mockRestore();
    });
  });
}
