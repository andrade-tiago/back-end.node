import type { IOrderItemMapper } from "./IOrderItemMapper";
import type { OrderItem } from "@/domain/entities/OrderItem";
import type { OrderItemOutput } from "@/application/dtos/OrderItemOutput";
import { beforeEach, describe, expect, expectTypeOf, test } from "vitest";
import { mockOrderItem } from "@/domain/entities/OrderItem.mock";

type TestOptions = {
  getInstanceFunc: () => IOrderItemMapper;
}

export function testOrderItemMapper(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IOrderItemMapper`, () =>
  {
    let factoryInstance: IOrderItemMapper;

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    describe('should map the values correctly', () =>
    {
      const orderItemInstances: OrderItem[] = Array.from({ length: 5 }).map(mockOrderItem);

      test.each(orderItemInstances)('input: %#', (item) =>
      {
        const result = factoryInstance.toOutput(item);

        expectTypeOf<typeof result>().toEqualTypeOf<OrderItemOutput>();

        expect(result.productId).toBe(item.productId.value);
        expect(result.unitPrice).toBe(item.unitPrice.value);
        expect(result.quantity).toBe(item.quantity.value);
      });
    });
  });
}
