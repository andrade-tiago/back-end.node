import { Order } from "@/domain/entities/order";
import { OrderItem } from "@/domain/entities/order/value-objects/order-item.vo";

export type OrderCreateInput = {
  userId: Order['userId']['value'];
  items: Array<{
    productId: OrderItem['productId']['value'],
    quantity: OrderItem['quantity']['value'],
  }>;
}
