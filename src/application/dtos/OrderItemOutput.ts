import { OrderItem } from "@/domain/entities/OrderItem";

export type OrderItemOutput = {
  productId: OrderItem['productId']['value'];
  unitPrice: OrderItem['unitPrice']['value'];
  quantity: OrderItem['quantity']['value'];
}
