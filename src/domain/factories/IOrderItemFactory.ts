import type { OrderItem } from "@/domain/entities/OrderItem";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import type { MoneyCreateValue } from "@/domain/value-objects/Money";
import type { PositiveIntCreateValue } from "@/domain/value-objects/PositiveInt";

export interface IOrderItemFactory {
  create(data: OrderItemFactoryCreate): OrderItem;
}

export type OrderItemFactoryCreate = {
  productId: UuidCreateValue;
  unitPrice: MoneyCreateValue;
  quantity: PositiveIntCreateValue;
}
