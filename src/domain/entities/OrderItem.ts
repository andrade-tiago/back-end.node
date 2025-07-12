import type { Product } from "./Product";
import type { PositiveInt } from "@/domain/value-objects/PositiveInt";
import { Money } from "@/domain/value-objects/Money";

export class OrderItem {
  private constructor(
    private readonly _props: OrderItemProps
  ) {}

  public static create(props: OrderItemProps): OrderItem {
    return new OrderItem(props);
  }

  public get productId() { return this._props.productId; }
  public get unitPrice() { return this._props.unitPrice; }
  public get quantity() { return this._props.quantity; }

  public getTotalCost(): Money {
    const totalCostValue = this.unitPrice.value * this.quantity.value;

    return Money.unsafeCreate(totalCostValue);
  }
}

export type OrderItemProps = {
  productId: Product['id'];
  unitPrice: Money;
  quantity: PositiveInt;
}
