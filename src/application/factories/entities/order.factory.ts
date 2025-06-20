import { Order } from "@/domain/entities/order";
import { OrderItem } from "@/domain/entities/order/value-objects/order-item.vo";

export interface IOrderFactory {
  create(props: OrderCreateData): Order;
}

type OrderCreateData = {
  id?: Order['id'] | Order['id']['value'];
  userId: Order['userId'] | Order['userId']['value'];
  createdAt?: Order['createdAt'] | Date | string | number;
  items: OrderItem[];
}
