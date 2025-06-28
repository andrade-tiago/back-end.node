import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { User } from "../user";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";
import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { OrderItem } from "../order-item";

export type OrderProps = {
  id: Uuid;
  userId: User['id'];
  items: OrderItem[];
  createdAt?: NonFutureDate;
}

export class Order {
  public readonly id: Uuid;
  public readonly userId: User['id'];
  public readonly items: readonly OrderItem[];
  public readonly createdAt: NonFutureDate;

  public constructor(props: OrderProps) {
    if (props.items.length === 0) {
      throw new InvalidDataError(DomainErrorMessages.Order.Empty);
    }

    {
      const uniqueItemsCount = new Set(props.items.map(item => item.productId.value)).size;
      if (uniqueItemsCount !== props.items.length) {
        throw new InvalidDataError(DomainErrorMessages.Order.DuplicateItems);
      }
    }

    this.id = props.id;
    this.userId = props.userId;
    this.createdAt = props.createdAt ?? new NonFutureDate();
    this.items = props.items;
  }

  public get totalCost(): Monetary {
    const totalCost = this.items.reduce(
      (acc, item) => acc + (item.unitPrice.value * item.quantity.value), 0
    );
    return new Monetary(totalCost);
  }
}
