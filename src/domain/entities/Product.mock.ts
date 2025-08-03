import { Product } from "./Product";
import { mockMoney } from "@/domain/value-objects/Money.mock";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { mockNonNegativeInt } from "@/domain/value-objects/NonNegativeInt.mock";
import { mockProductTitle } from "@/domain/value-objects/ProductTitle.mock";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";

export const mockProduct = (): Product =>
{
  return Product.create({
    id: mockUuid(),
    title: mockProductTitle(),
    price: mockMoney(),
    inStock: mockNonNegativeInt(),
    createdAt: mockNonFutureDatetime(),
  });
};
