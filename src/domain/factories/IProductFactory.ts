import { Product } from "../entities/Product";
import { MoneyCreateValue } from "../value-objects/Money";
import { NonFutureDatetimeCreateValue } from "../value-objects/NonFutureDatetime";
import { NonNegativeIntCreateValue } from "../value-objects/NonNegativeInt";
import { ProductTitleCreateValue } from "../value-objects/ProductTitle";
import { UuidCreateValue } from "../value-objects/Uuid";

export interface IProductFactory {
  create(data: ProductFactoryCreate): Product;
}

export type ProductFactoryCreate = {
  id?: UuidCreateValue;
  title: ProductTitleCreateValue;
  price: MoneyCreateValue;
  inStock?: NonNegativeIntCreateValue;
  createdAt?: NonFutureDatetimeCreateValue;
}
