import type { IUuidFactory } from "./IUuidFactory";
import { Uuid, type UuidCreateValue } from "@/domain/value-objects/Uuid";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => IUuidFactory;
}

export function testUuidFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IUuidFactory`, () =>
  {
    let factoryInstance: IUuidFactory;

    const fakeInstance1: Uuid = mockUuid();
    const fakeInstance2: Uuid = mockUuid();
    const invalidValue: UuidCreateValue = faker.lorem.text();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from a Uuid instance successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1);

      expect(testInstance).toBeInstanceOf(Uuid);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1.value);

      expect(testInstance).toBeInstanceOf(Uuid);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);
    });

    it('should call Uuid.create internally', () =>
    {
      const spy = vi.spyOn(Uuid, 'create').mockReturnValue(fakeInstance2);
      const result = factoryInstance.create(fakeInstance1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeInstance1);
      expect(result.value).toBe(fakeInstance2.value);

      spy.mockRestore();
    });
  });
}
