import type { Order } from "@/domain/entities/Order";
import type { OrderItem } from "@/domain/entities/OrderItem";
import type { NonFutureDatetimeCreateValue } from "@/domain/value-objects/NonFutureDatetime";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";

export interface IOrderFactory {
  create(props: OrderFactoryCreate): Order;
}

export type OrderFactoryCreate = {
  id?: UuidCreateValue;
  userId: UuidCreateValue;
  createdAt?: NonFutureDatetimeCreateValue;
  items: OrderItem[];
}
