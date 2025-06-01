import { ProductDescription } from "@/domain/value-objects/product-description.vo";

export interface IProductDescriptionFactory {
  create(value: string): ProductDescription;
}
