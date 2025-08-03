import type { IMoneyFactory } from "./IMoneyFactory";
import { Money, type MoneyCreateValue } from "@/domain/value-objects/Money";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMoney } from "@/domain/value-objects/Money.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions =
{
  getInstanceFunc: () => IMoneyFactory;
};

export function testMoneyFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IMoneyFactory`, () =>
  {
    let factoryInstance: IMoneyFactory;

    const fakeMoney1: Money = mockMoney();
    const fakeMoney2: Money = mockMoney();
    const invalidValue: MoneyCreateValue = faker.number.int({ max: 0 });

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from an Money instance successfully', () =>
    {
      const result = factoryInstance.create(fakeMoney1);

      expect(result).toBeInstanceOf(Money);
      expect(result.value).toBe(fakeMoney1.value);
    });

    it('should be created from a number value successfully', () =>
    {
      const result = factoryInstance.create(fakeMoney1.value);

      expect(result).toBeInstanceOf(Money);
      expect(result.value).toBe(fakeMoney1.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);
    });

    it('should call Money.create internally', () =>
    {
      const spy = vi.spyOn(Money, 'create').mockReturnValue(fakeMoney2);
      const result = factoryInstance.create(fakeMoney1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeMoney1);
      expect(result.value).toBe(fakeMoney2.value);

      spy.mockRestore();
    });
  });
}
