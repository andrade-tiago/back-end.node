import type { INonNegativeIntFactory } from "./INonNegativeIntFactory";
import { NonNegativeInt, type NonNegativeIntCreateValue } from "@/domain/value-objects/NonNegativeInt";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNonNegativeInt } from "@/domain/value-objects/NonNegativeInt.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => INonNegativeIntFactory;
}

export function testNonNegativeIntFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - INonNegativeIntFactory`, () =>
  {
    let factoryInstance: INonNegativeIntFactory;

    const fakeInstance1: NonNegativeInt = mockNonNegativeInt();
    const fakeInstance2: NonNegativeInt = mockNonNegativeInt();
    const invalidValue: NonNegativeIntCreateValue = faker.number.int({ min: -10, max: -1 });

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from a NonNegativeInt instance successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1);

      expect(testInstance).toBeInstanceOf(NonNegativeInt);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should be created from a number value successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1.value);

      expect(testInstance).toBeInstanceOf(NonNegativeInt);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should throw for invalid values', () =>
    {
      const spy = vi.spyOn(NonNegativeInt, 'create')
        .mockImplementation(() => { throw new InvalidDataError('') });

      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);

      spy.mockRestore();
    });

    it('should call NonNegativeInt.create internally', () =>
    {
      const spy = vi.spyOn(NonNegativeInt, 'create').mockReturnValue(fakeInstance2);
      const result = factoryInstance.create(fakeInstance1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeInstance1);
      expect(result.value).toBe(fakeInstance2.value);

      spy.mockRestore();
    });
  });
}
