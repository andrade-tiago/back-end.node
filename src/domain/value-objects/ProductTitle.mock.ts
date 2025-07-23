import { ProductTitle, type ProductTitleValue } from "./ProductTitle";
import { faker } from "@faker-js/faker";

export const mockProductTitle = (): ProductTitle =>
{
  const value: ProductTitleValue = faker.commerce.productName();

  return ProductTitle.unsafeCreate(value);
};
