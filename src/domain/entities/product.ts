import { Monetary } from "@/domain/value-objects/monetary.vo";
import { NonNegativeInt } from "@/domain/value-objects/non-negative-int.vo";
import { ProductDescription } from "@/domain/value-objects/product-description.vo";
import { ProductName } from "@/domain/value-objects/product-name.vo";
import { Uuid } from "@/domain/value-objects/uuid.vo";

export type ProductProps = {
  id: Uuid;
  name: ProductName;
  price: Monetary;
  description: ProductDescription;
  stock: NonNegativeInt;
} 

export class Product {
  public readonly id: Uuid;
  public readonly name: ProductName;
  public readonly price: Monetary;
  public readonly description: ProductDescription;
  public readonly stock: NonNegativeInt;

  public constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.description = props.description;
    this.stock = props.stock;
  }
}
