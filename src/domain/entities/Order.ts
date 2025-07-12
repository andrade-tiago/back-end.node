import type { OrderItem } from "./OrderItem";
import type { UserProps } from "./User";
import type { Uuid } from "@/domain/value-objects/Uuid";
import type { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";
import { Money } from "@/domain/value-objects/Money";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class Order {
  private constructor(
    private readonly _props: OrderProps,
  ) {
    if (_props.items.length === 0) {
      throw new InvalidDataError(ErrorMessages.Order.Empty);
    }
    if (!Order.areItemsUnique(_props.items)) {
      throw new InvalidDataError(ErrorMessages.Order.DuplicateItems);
    }
  }

  public static create(props: OrderProps): Order {
    return new Order(props);
  }

  public get id() { return this._props.id; }
  public get userId() { return this._props.userId; }
  public get items() { return this._props.items; }
  public get createdAt() { return this._props.createdAt; }

  public getTotalCost(): Money {
    const totalCostValue: number = this.items.reduce(
      (acc, item) => acc + item.getTotalCost().value, 0
    );

    return Money.unsafeCreate(totalCostValue);
  }



  private static areItemsUnique(items: OrderProps['items']): boolean {
    const itemsIDs = items.map(item => item.productId.value);

    const uniqueIDsSet = new Set(itemsIDs);

    return itemsIDs.length === uniqueIDsSet.size;
  }
}

export type OrderProps = {
  id: Uuid;
  userId: UserProps['id'];
  items: OrderItem[];
  createdAt: NonFutureDatetime;
}
