import type { Order } from "@/domain/entities/Order";
import type { OrderOutput } from "@/application/dtos/OrderOutput";

export interface IOrderMapper {
  toOutput(order: Order): OrderOutput;
}
