import type { Money } from "@/domain/value-objects/Money";
import type { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";
import type { NonNegativeInt } from "@/domain/value-objects/NonNegativeInt";
import type { ProductTitle } from "@/domain/value-objects/ProductTitle";
import type { Uuid } from "@/domain/value-objects/Uuid";

export class Product {
  private constructor(
    private readonly _props: ProductProps,
  ) {}

  public static create(props: ProductProps): Product {
    return new Product(props);
  }

  public get id() { return this._props.id; }
  public get title() { return this._props.title; }
  public get price() { return this._props.price; }
  public get inStock() { return this._props.inStock; }
  public get createdAt() { return this._props.createdAt; }
}

export type ProductProps = {
  id: Uuid;
  title: ProductTitle;
  price: Money;
  inStock: NonNegativeInt;
  createdAt: NonFutureDatetime;
}
