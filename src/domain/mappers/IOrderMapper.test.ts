import { beforeEach, describe, expect, expectTypeOf, test } from "vitest";
import { IOrderMapper } from "./IOrderMapper";
import { Order } from "../entities/Order";
import { mockOrder } from "../entities/Order.mock";
import { OrderOutput } from "@/application/dtos/OrderOutput";

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
      const orderInstances: Order[] = Array.from({ length: 5 }).map(() => mockOrder(0));

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
