import { ProductName } from "@/domain/value-objects/product-name.vo";

export interface ProductNameFactory {
  create(value: string): ProductName;
}
