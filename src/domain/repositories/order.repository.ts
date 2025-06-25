import { Order } from "../entities/order";

export interface IOrderRepository {
  create(order: Order): Promise<void>;
  getById(id: Order['id']): Promise<Order>;
}
