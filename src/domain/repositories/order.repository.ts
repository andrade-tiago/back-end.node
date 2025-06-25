import { Order } from "../entities/order";
import { User } from "../entities/user";
import { PositiveInt } from "../shared/value-objects/positive-int.vo";

export interface IOrderRepository {
  create(order: Order): Promise<void>;
  getById(id: Order['id']): Promise<Order>;
  getByUserId(options: OrderGetByUserIdOptions): Promise<Order[]>;
}

type OrderGetByUserIdOptions = {
  userId: User['id'],
  pageNumber: PositiveInt,
  pageSize: PositiveInt,
}
