import { Order, OrderProps } from "@/domain/entities/order";
import { IOrderFactory, OrderCreateData } from "../order.factory";
import { IUuidFactory } from "../../value-objects/uuid.factory";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

export class OrderFactory implements IOrderFactory {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
  ) {}

  public create(props: OrderCreateData): Order {
    return new Order({
      id: this.resolveId(props.id),
      userId: this.resolveUserId(props.userId),
      items: this.resolveItems(props.items),
      createdAt: this.resolveCreatedAt(props.createdAt),
    });
  }

  private resolveId(id: OrderCreateData['id']): OrderProps['id'] {
    if (id instanceof Uuid) {
      return id;
    }
    return id
      ? this._uuidFactory.createFromString(id)
      : this._uuidFactory.generate();
  }
  private resolveUserId(userId: OrderCreateData['userId']): OrderProps['userId'] {
    return userId instanceof Uuid ? userId : this._uuidFactory.createFromString(userId);
  }
  private resolveCreatedAt(datetime: OrderCreateData['createdAt']): OrderProps['createdAt'] {
    if (datetime instanceof NonFutureDate || typeof datetime === 'undefined') {
      return datetime;
    }
    return NonFutureDate.create(datetime);
  }
  private resolveItems(items: OrderCreateData['items']): OrderProps['items'] {
    return items;
  }
}
