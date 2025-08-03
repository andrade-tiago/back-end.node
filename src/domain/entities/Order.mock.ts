import type { OrderItem } from "./OrderItem";
import { Order } from "./Order";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockOrderItem } from "./OrderItem.mock";
import { faker } from "@faker-js/faker";

export const mockOrder = (
  itemQuantity: number = faker.number.int({ min: 2, max: 5 })
): Order =>
{
  const orderItems: OrderItem[] = Array.from({ length: itemQuantity }).map(mockOrderItem);

  return Order.create({
    id: mockUuid(),
    userId: mockUuid(),
    createdAt: mockNonFutureDatetime(),
    items: orderItems,
  });
};
