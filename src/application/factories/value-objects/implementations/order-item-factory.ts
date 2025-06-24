import { OrderItem, OrderItemProps } from "@/domain/entities/order/value-objects/order-item.vo";
import { IOrderItemFactory, OrderItemFactoryCreate } from "../order-item.factory";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { IUuidFactory } from "../uuid.factory";
import { IMonetaryFactory } from "../monetary.factory";
import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { IPositiveIntFactory } from "./positive-int.factory";
import { PositiveInt } from "@/domain/shared/value-objects/positive-int.vo";

export class OrderItemFactory implements IOrderItemFactory {
  public constructor(
    private _uuidFactory: IUuidFactory,
    private _monetaryFactory: IMonetaryFactory,
    private _positiveIntFactory: IPositiveIntFactory,
  ) {}

  public create(data: OrderItemFactoryCreate): OrderItem {
    return new OrderItem({
      productId: this.resolveProductId(data.productId),
      unitPrice: this.resolveUnitPrice(data.unitPrice),
      quantity: this.resolveQuantity(data.quantity),
    });
  }

  private resolveProductId(id: OrderItemFactoryCreate['productId']): OrderItemProps['productId'] {
    return id instanceof Uuid ? id : this._uuidFactory.createFromString(id);
  }
  private resolveUnitPrice(value: OrderItemFactoryCreate['unitPrice']): OrderItemProps['unitPrice'] {
    return value instanceof Monetary ? value : this._monetaryFactory.create(value);
  }
  private resolveQuantity(value: OrderItemFactoryCreate['quantity']): OrderItemProps['quantity'] {
    return value instanceof PositiveInt ? value : this._positiveIntFactory.create(value);
  }
}
