import type { Order } from "@/domain/entities/Order";
import type { UserProps } from "@/domain/entities/User";
import type { PositiveInt } from "@/domain/value-objects/PositiveInt";

export interface IOrderRepository {
  add(order: Order): Promise<void>;
  getById(id: Order['id']): Promise<Order | undefined>;
  getByUserId(options: OrderGetByUserIdOptions): Promise<Order[]>;
}

type OrderGetByUserIdOptions = {
  userId: UserProps['id'];
  pageNumber: PositiveInt;
  pageSize: PositiveInt;
}
