import { ProductTitle } from "@/domain/entities/product/value-objects/product-title.vo";
import { IProductTitleFactory } from "../product-title.factory";

export class ProductTitleFactory implements IProductTitleFactory {
  public create(value: string): ProductTitle {
    return new ProductTitle(value);
  }
}
