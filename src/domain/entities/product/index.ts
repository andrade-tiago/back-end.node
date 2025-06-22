import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { NonNegativeInt } from "@/domain/shared/value-objects/non-negative-int.vo";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { ProductTitle } from "./value-objects/product-title.vo";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

export type ProductProps = {
  id: Uuid;
  title: ProductTitle;
  price: Monetary;
  inStock?: NonNegativeInt;
  createdAt?: NonFutureDate;
}

export class Product {
  public readonly id: Uuid;
  public readonly title: ProductTitle;
  public readonly price: Monetary;
  public readonly inStock: NonNegativeInt;
  public readonly createdAt: NonFutureDate;

  public constructor(props: ProductProps) {
    this.id = props.id;
    this.title = props.title;
    this.price = props.price;
    this.inStock = props.inStock ?? new NonNegativeInt(0);
    this.createdAt = props.createdAt ?? NonFutureDate.now();
  }
}
