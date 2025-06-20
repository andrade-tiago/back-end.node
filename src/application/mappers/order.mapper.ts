import { Order } from "@/domain/entities/order";
import { OrderOutput } from "../use-cases/order.output";

export interface IOrderMapper {
  toOutput(order: Order): OrderOutput;
}
