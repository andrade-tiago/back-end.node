import { ProductTitle } from "@/domain/entities/product/value-objects/product-title.vo";

export interface IProductTitleFactory {
  create(value: string): ProductTitle;
}
