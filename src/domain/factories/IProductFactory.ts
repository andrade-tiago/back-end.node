import { Product } from "@/domain/entities/Product";
import { MoneyCreateValue } from "@/domain/value-objects/Money";
import { NonFutureDatetimeCreateValue } from "@/domain/value-objects/NonFutureDatetime";
import { NonNegativeIntCreateValue } from "@/domain/value-objects/NonNegativeInt";
import { ProductTitleCreateValue } from "@/domain/value-objects/ProductTitle";
import { UuidCreateValue } from "@/domain/value-objects/Uuid";

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
