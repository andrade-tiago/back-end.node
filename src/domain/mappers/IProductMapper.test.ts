import type { IProductMapper } from "./IProductMapper";
import type { Product } from "@/domain/entities/Product";
import type { ProductOutput } from "@/application/dtos/ProductOutput";
import { beforeEach, describe, expect, expectTypeOf, test } from "vitest";
import { mockProduct } from "@/domain/entities/Product.mock";

type TestOptions = {
  getInstanceFunc: () => IProductMapper;
}

export function testProductMapper(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IProductMapper`, () =>
  {
    let factoryInstance: IProductMapper;

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    describe('should map the values correctly', () =>
    {
      const productInstances: Product[] = Array.from({ length: 5 }).map(mockProduct);

      test.each(productInstances)('input: %#', (product) =>
      {
        const result = factoryInstance.toOutput(product);

        expectTypeOf<typeof result>().toEqualTypeOf<ProductOutput>();

        expect(result.id).toBe(product.id.value);
        expect(result.title).toBe(product.title.value);
        expect(result.price).toBe(product.price.value);
        expect(result.inStock).toBe(product.inStock.value);
        expect(result.createdAt).toBe(product.createdAt.value);
      });
    });
  });
}
