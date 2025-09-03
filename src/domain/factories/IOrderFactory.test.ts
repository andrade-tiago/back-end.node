import type { IOrderFactory } from "./IOrderFactory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockOrder } from "@/domain/entities/Order.mock";
import { Uuid } from "@/domain/value-objects/Uuid";

type TestOptions = {
  getInstanceFunc: () => IOrderFactory;
}

export function testOrderFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IOrderFactory`, () =>
  {
    let factoryInstance: IOrderFactory;

    const fakeOrder = mockOrder();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should create an Order instance with correct values from pure values', () =>
    {
      const result = factoryInstance.create(
      {
        id: fakeOrder.id.value,
        userId: fakeOrder.userId.value,
        items: fakeOrder.items,
        createdAt: fakeOrder.createdAt.toDate(),
      });

      expect(result.id.value).toBe(fakeOrder.id.value);
      expect(result.userId.value).toBe(fakeOrder.userId.value);
      expect(result.createdAt.value).toBe(fakeOrder.createdAt.value);
    });

    it('should create an Order instance with correct values from Value Objects', () =>
    {
      const result = factoryInstance.create(
      {
        id: fakeOrder.id,
        userId: fakeOrder.userId,
        items: fakeOrder.items,
        createdAt: fakeOrder.createdAt,
      });

      expect(result.id.value).toBe(fakeOrder.id.value);
      expect(result.userId.value).toBe(fakeOrder.userId.value);
      expect(result.createdAt.value).toBe(fakeOrder.createdAt.value);

      expect(result.items).toBe(fakeOrder.items);
    });

    it('should create an Order instance with correct values for optional values', () =>
    {
      const now = new Date();

      vi.useFakeTimers();
      vi.setSystemTime(now);

      const result = factoryInstance.create(
      {
        userId: fakeOrder.userId,
        items: fakeOrder.items,
      });

      expect(result.id).instanceOf(Uuid);
      expect(result.createdAt.toDate().getTime())
        .toBe(now.getTime());

      vi.useRealTimers();
    });
  });
}
