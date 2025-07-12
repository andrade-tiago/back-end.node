import type { Order } from "@/domain/entities/Order";
import type { OrderItemOutput } from "./OrderItemOutput";

export type OrderOutput = {
  id: Order['id']['value'];
  userId: Order['userId']['value'];
  createdAt: Order['createdAt']['value'];
  items: OrderItemOutput[];
}
