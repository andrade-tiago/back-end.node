import type { IOrderMapper } from "./IOrderMapper";
import { Order } from "@/domain/entities/Order";
import { OrderOutput } from "@/application/dtos/OrderOutput";
import { beforeEach, describe, expect, expectTypeOf, test } from "vitest";
import { mockOrder } from "@/domain/entities/Order.mock";

type TestOptions = {
  getInstanceFunc: () => IOrderMapper;
}

export function testOrderMapper(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IOrderMapper`, () =>
  {
    let factoryInstance: IOrderMapper;

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    describe('should map the values correctly', () =>
    {
      const orderInstances: Order[] = Array.from({ length: 5 }).map(() => mockOrder(1));

      test.each(orderInstances)('input: %#', (order) =>
      {
        const result = factoryInstance.toOutput(order);

        expectTypeOf<typeof result>().toEqualTypeOf<OrderOutput>();

        expect(result.id).toBe(order.id.value);
        expect(result.userId).toBe(order.userId.value);
        expect(result.createdAt).toBe(order.createdAt.value);
      });
    });
  });
}
