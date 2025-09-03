import { ProductTitle } from "../value-objects/ProductTitle";
import { IProductTitleFactory } from "./IProductTitleFactory";

export const mockProductTitleFactory = (): IProductTitleFactory =>
{
  return {
    create: value => value instanceof ProductTitle ? value : ProductTitle.unsafeCreate(value),
  };
};
