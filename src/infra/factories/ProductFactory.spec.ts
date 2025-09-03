import { testProductFactory } from "@/domain/factories/IProductFactory.test";
import { ProductFactory } from "./ProductFactory";
import { mockMoneyFactory } from "@/domain/factories/IMoneyFactory.mock";
import { mockNonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory.mock";
import { mockNonNegativeIntFactory } from "@/domain/factories/INonNegativeIntFactory.mock";
import { mockProductTitleFactory } from "@/domain/factories/IProductTitleFactory.mock";
import { mockUuidFactory } from "@/domain/factories/IUuidFactory.mock";

testProductFactory({
  getInstanceFunc: () => new ProductFactory(
  {
    moneyFactory: mockMoneyFactory(),
    nonFutureDatetimeFactory: mockNonFutureDatetimeFactory(),
    nonNegativeIntFactory: mockNonNegativeIntFactory(),
    productTitleFactory: mockProductTitleFactory(),
    uuidFactory: mockUuidFactory(),
  }),
});
