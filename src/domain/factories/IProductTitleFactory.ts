import type { ProductTitle, ProductTitleCreateValue } from "@/domain/value-objects/ProductTitle";

export interface IProductTitleFactory {
  create(value: ProductTitleCreateValue): ProductTitle;
}
