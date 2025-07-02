import { describe, expect, it } from "vitest";
import { OrderItem } from ".";
import { makeFakeUuid } from "@/domain/shared/value-objects/uuid.vo.fake";
import { makeFakeMonetary } from "@/domain/shared/value-objects/monetary.vo.fake";
import { makeFakePositiveInt } from "@/domain/shared/value-objects/positive-int.vo.fake";

describe('OrderItem Entity', () => {
  it('should be created with accessible and correct values', () => {
    const uuid = makeFakeUuid();
    const price = makeFakeMonetary();
    const quantity = makeFakePositiveInt();

    const orderItem = new OrderItem({
      productId: uuid,
      unitPrice: price,
      quantity: quantity,
    });

    expect(orderItem.productId.value).toBe(uuid.value);
    expect(orderItem.unitPrice.value).toBe(price.value);
    expect(orderItem.quantity.value).toBe(quantity.value);
  });
});
