import { ProductTitle } from "@/domain/entities/product/value-objects/product-title.vo";

export interface ProductTitleFactory {
  create(value: string): ProductTitle;
}
