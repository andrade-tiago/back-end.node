import type { INonFutureDatetimeFactory } from "./INonFutureDatetimeFactory";
import { NonFutureDatetime, type NonFutureDatetimeCreateValue } from "@/domain/value-objects/NonFutureDatetime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => INonFutureDatetimeFactory;
};

export function testNonFutureDatetimeFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - INonFutureDatetimeFactory`, () =>
  {
    let factoryInstance: INonFutureDatetimeFactory;

    const fakeDatetime1: NonFutureDatetime = mockNonFutureDatetime();
    const fakeDatetime2: NonFutureDatetime = mockNonFutureDatetime();
    const invalidValue: NonFutureDatetimeCreateValue = faker.lorem.text();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from an NonFutureDatetime instance successfully', () =>
    {
      const result = factoryInstance.create(fakeDatetime1);

      expect(result).toBeInstanceOf(NonFutureDatetime);
      expect(result.value).toBe(fakeDatetime1.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const result = factoryInstance.create(fakeDatetime1.value);

      expect(result).toBeInstanceOf(NonFutureDatetime);
      expect(result.value).toBe(fakeDatetime1.value);
    });

    it('should be created from a number value successfully', () =>
    {
      const result = factoryInstance.create(fakeDatetime1.toDate().getTime());

      expect(result).toBeInstanceOf(NonFutureDatetime);
      expect(result.value).toBe(fakeDatetime1.value);
    });

    it('should be created from a Date value successfully', () =>
    {
      const result = factoryInstance.create(fakeDatetime1.toDate());

      expect(result).toBeInstanceOf(NonFutureDatetime);
      expect(result.value).toBe(fakeDatetime1.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);
    });

    it('should call NonFutureDatetime.create internally', () =>
    {
      const spy = vi.spyOn(NonFutureDatetime, 'create').mockReturnValue(fakeDatetime2);
      const result = factoryInstance.create(fakeDatetime1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeDatetime1);
      expect(result.value).toBe(fakeDatetime2.value);

      spy.mockRestore();
    });
  });
}
