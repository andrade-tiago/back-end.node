import type { IPositiveIntFactory } from "./IPositiveIntFactory";
import { PositiveInt, type PositiveIntCreateValue } from "@/domain/value-objects/PositiveInt";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockPositiveInt } from "@/domain/value-objects/PositiveInt.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => IPositiveIntFactory;
}

export function testPositiveIntFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IPositiveIntFactory`, () =>
  {
    let factoryInstance: IPositiveIntFactory;

    const fakeInstance1: PositiveInt = mockPositiveInt();
    const fakeInstance2: PositiveInt = mockPositiveInt();
    const invalidValue: PositiveIntCreateValue = faker.number.int({ max: 0 });

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from a PositiveInt instance successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1);

      expect(testInstance).toBeInstanceOf(PositiveInt);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should be created from a number value successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1.value);

      expect(testInstance).toBeInstanceOf(PositiveInt);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should throw for invalid values', () =>
    {
      const spy = vi.spyOn(PositiveInt, 'create')
        .mockImplementation(() => { throw new InvalidDataError('') });

      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);

      spy.mockRestore();
    });

    it('should call PositiveInt.create internally', () =>
    {
      const spy = vi.spyOn(PositiveInt, 'create').mockReturnValue(fakeInstance2);
      const result = factoryInstance.create(fakeInstance1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeInstance1);
      expect(result.value).toBe(fakeInstance2.value);

      spy.mockRestore();
    });
  });
}
