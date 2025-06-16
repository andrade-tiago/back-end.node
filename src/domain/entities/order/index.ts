import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { OrderItem } from "./value-objects/order-item.vo";
import { User } from "../user";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { EmptyOrderError } from "@/domain/errors/empty-order.error";
import { DuplicateOrderItemsError } from "@/domain/errors/duplicate-order-items.error";

type OrderProps = {
  id: Uuid;
  userId: User['id'];
  items: OrderItem[];
  createdAt: NonFutureDate;
}

export class Order {
  public readonly id: Uuid;
  public readonly userId: User['id'];
  public readonly items: readonly OrderItem[];
  public readonly createdAt: NonFutureDate;

  public constructor(props: OrderProps) {
    if (props.items.length === 0) {
      throw new EmptyOrderError();
    }
    if (!Order.containsUniqueItems(props.items)) {
      throw new DuplicateOrderItemsError();
    }

    this.id = props.id;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.items = props.items;
  }

  public get totalCost(): Monetary {
    const totalCost = this.items.reduce(
      (acc, item) => acc + (item.unitPrice.value * item.quantity.value), 0
    );
    return new Monetary(totalCost);
  }

  private static containsUniqueItems(items: OrderItem[]) {
    const orderItemsMap = new Map<OrderItem['productId']['value'], number>();
    items.forEach(item => {
      orderItemsMap.set(item.productId.value, 0);
    });

    return orderItemsMap.size === items.length;
  }
}
