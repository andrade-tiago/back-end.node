import type { OrderItem } from "@/domain/entities/OrderItem";
import type { OrderItemOutput } from "@/application/dtos/OrderItemOutput";

export interface IOrderItemMapper {
  toOutput(item: OrderItem): OrderItemOutput;
}
