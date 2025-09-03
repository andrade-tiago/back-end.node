import type { IProductFactory } from "./IProductFactory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockProduct } from "@/domain/entities/Product.mock";
import { Uuid } from "@/domain/value-objects/Uuid";
import { NonNegativeInt } from "@/domain/value-objects/NonNegativeInt";

type TestOptions = {
  getInstanceFunc: () => IProductFactory;
}

export function testProductFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IProductFactory`, () =>
  {
    let factoryInstance: IProductFactory;

    const fakeProduct = mockProduct();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should create a Product instance with correct values from pure values', () =>
    {
      const result = factoryInstance.create(
      {
        id: fakeProduct.id.value,
        title: fakeProduct.title.value,
        price: fakeProduct.price.value,
        createdAt: fakeProduct.createdAt.toDate(),
        inStock: fakeProduct.inStock.value,
      });

      expect(result.id.value).toBe(fakeProduct.id.value);
      expect(result.title.value).toBe(fakeProduct.title.value);
      expect(result.price.value).toBe(fakeProduct.price.value);
      expect(result.inStock.value).toBe(fakeProduct.inStock.value);
      expect(result.createdAt.value).toBe(fakeProduct.createdAt.value);
    });

    it('should create an Order instance with correct values from Value Objects', () =>
    {
      const result = factoryInstance.create(
      {
        id: fakeProduct.id,
        title: fakeProduct.title,
        price: fakeProduct.price,
        createdAt: fakeProduct.createdAt,
        inStock: fakeProduct.inStock,
      });

      expect(result.id.value).toBe(fakeProduct.id.value);
      expect(result.title.value).toBe(fakeProduct.title.value);
      expect(result.price.value).toBe(fakeProduct.price.value);
      expect(result.inStock.value).toBe(fakeProduct.inStock.value);
      expect(result.createdAt.value).toBe(fakeProduct.createdAt.value);
    });

    it('should create an Order instance with correct values for optional values', () =>
    {
      const now = new Date();

      vi.useFakeTimers();
      vi.setSystemTime(now);

      const result = factoryInstance.create(
      {
        title: fakeProduct.title,
        price: fakeProduct.price,
      });

      expect(result.id).instanceOf(Uuid);
      expect(result.inStock.value).toBe(NonNegativeInt.ZERO.value);
      expect(result.createdAt.toDate().getTime())
        .toBe(now.getTime());

      vi.useRealTimers();
    });
  });
}
