import { Order } from "@/domain/entities/order";
import { OrderItem } from "@/domain/entities/order/value-objects/order-item.vo";

export type OrderCreateInput = {
  userId: Order['userId']['value'];
  itemIds: Array<OrderItem['productId']['value']>;
}
