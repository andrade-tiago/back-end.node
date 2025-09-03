import { mockOrderItem } from "@/domain/entities/OrderItem.mock";
import type { IOrderItemFactory } from "./IOrderItemFactory"
import { beforeEach, describe, expect, it } from "vitest";

type TestOptions = {
  getInstanceFunc: () => IOrderItemFactory;
}

export function testOrderItemFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IOrderItemFactory`, () =>
  {
    let factoryInstance: IOrderItemFactory;

    const fakeOrderItem = mockOrderItem();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should create an OrderItem instance with correct values from pure values', () =>
    {
      const result = factoryInstance.create(
      {
        productId: fakeOrderItem.productId.value,
        unitPrice: fakeOrderItem.unitPrice.value,
        quantity: fakeOrderItem.quantity.value,
      });

      expect(result.productId.value).toBe(fakeOrderItem.productId.value);
      expect(result.unitPrice.value).toBe(fakeOrderItem.unitPrice.value);
      expect(result.quantity.value).toBe(fakeOrderItem.quantity.value);
    });

    it('should create an OrderItem instance with correct values from Value Objects', () =>
    {
      const result = factoryInstance.create(
      {
        productId: fakeOrderItem.productId,
        unitPrice: fakeOrderItem.unitPrice,
        quantity: fakeOrderItem.quantity,
      });

      expect(result.productId.value).toBe(fakeOrderItem.productId.value);
      expect(result.unitPrice.value).toBe(fakeOrderItem.unitPrice.value);
      expect(result.quantity.value).toBe(fakeOrderItem.quantity.value);
    });
  });
}
