import { ProductName } from "./product-name.vo";

export interface ProductNameFactory {
  create(value: string): ProductName;
}
