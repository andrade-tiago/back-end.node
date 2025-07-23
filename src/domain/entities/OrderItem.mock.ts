import { OrderItem } from "./OrderItem";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockMoney } from "@/domain/value-objects/Money.mock";
import { mockPositiveInt } from "@/domain/value-objects/PositiveInt.mock";

export const mockOrderItem = (): OrderItem =>
{
  return OrderItem.create(
  {
    productId: mockUuid(),
    unitPrice: mockMoney(),
    quantity: mockPositiveInt(),
  });
};
