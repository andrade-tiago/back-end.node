import { faker } from "@faker-js/faker";
import { ProductTitle } from "./product-title.vo";

export const makeFakeProductTitle = (): ProductTitle => {
  return new ProductTitle(faker.commerce.productName());
};
