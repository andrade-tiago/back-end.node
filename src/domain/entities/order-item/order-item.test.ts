import { describe, expect, it } from "vitest";
import { OrderItem } from ".";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { PositiveInt } from "@/domain/shared/value-objects/positive-int.vo";
import { Monetary } from "@/domain/shared/value-objects/monetary.vo";

describe('OrderItem Entity', () => {
  it('should be created with accessible and correct values', () => {
    const uuid = new Uuid('95d58700-fe12-4fa6-9c8e-a2b9b353cda5');
    const price = new Monetary(12.5);
    const quantity = new PositiveInt(10);

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
