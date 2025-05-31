import { ProductDescription } from "./product-description.vo";

export interface IProductDescriptionFactory {
  create(value: string): ProductDescription;
}
