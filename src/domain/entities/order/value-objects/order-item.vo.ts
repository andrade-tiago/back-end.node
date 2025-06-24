import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { PositiveInt } from "@/domain/shared/value-objects/positive-int.vo";
import { Product } from "../../product";

export type OrderItemProps = {
  productId: Product['id'];
  unitPrice: Monetary;  
  quantity: PositiveInt;
}

export class OrderItem {
  public readonly productId: Product['id'];
  public readonly unitPrice: Monetary;
  public readonly quantity: PositiveInt;

  public constructor(props: OrderItemProps) {
    this.productId = props.productId;
    this.unitPrice = props.unitPrice;
    this.quantity = props.quantity;
  }
}
