import { Order } from "@/domain/entities/order"
import { OrderItem } from "@/domain/entities/order-item";

export type OrderOutput = {
  id: Order['id']['value'];
  userId: Order['userId']['value'];
  createdAt: ReturnType<Date['toISOString']>;
  items: OrderItemOutput[];
}

type OrderItemOutput = {
  productId: OrderItem['productId']['value'];
  unitPrice: OrderItem['unitPrice']['value'];
  quantity: OrderItem['quantity']['value'];
}
