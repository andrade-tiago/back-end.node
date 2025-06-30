import { describe, expect, it, vi } from "vitest";
import { Order } from ".";
import { makeFakeUuid } from "@/domain/shared/value-objects/uuid.vo.fake";
import { makeFakeNonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo.fake";
import { makeOrderItem } from "../order-item/order-item.fake";

describe('Order Entity', () => {
  it('should be created with accessible, correct values', () => {
    const id = makeFakeUuid();
    const userId = makeFakeUuid();
    const createdAt = makeFakeNonFutureDate();
    const items = Array.from({ length: 10 }).map(makeOrderItem);

    {
      const order1 = new Order({ id, userId, items, createdAt });

      expect(order1.id.value).toBe(id.value);
      expect(order1.userId.value).toBe(userId.value);
      expect(order1.createdAt.toDate().getTime())
        .toBe(createdAt.toDate().getTime());

      items.forEach((_, i) => {
        expect(items[i].productId.value)
          .toBe(order1.items[i].productId.value);
      });

      {
        const totalCost: number = order1.items.reduce(( acc, item ) => {
          return acc + (item.quantity.value * item.unitPrice.value);
        }, 0);
  
        expect(order1.totalCost.value).toBe(totalCost);
      }
    }

    {
      const now = Date.now();

      vi.useFakeTimers();
      vi.setSystemTime(now);

      const order2 = new Order({ id, userId, items });

      expect(order2.createdAt.toDate().getTime()).toBe(now);

      vi.useRealTimers();
    }
  });

  it('should thrown an error if the items list is empty', () => {
    expect(() => {
      new Order({
        id: makeFakeUuid(),
        userId: makeFakeUuid(),
        items: [],
      });
    }).toThrow();
  });
});
