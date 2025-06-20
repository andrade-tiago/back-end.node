import { Order } from ".";

export interface IOrderRepository {
  create(order: Order): Promise<void>;
}
