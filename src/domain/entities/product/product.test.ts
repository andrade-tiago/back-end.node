import { describe, expect, test, vi } from "vitest";
import { Product, ProductProps } from ".";
import { makeFakeUuid } from "@/domain/shared/value-objects/uuid.vo.fake";
import { makeFakeMonetary } from "@/domain/shared/value-objects/monetary.vo.fake";
import { makeFakeProductTitle } from "./value-objects/product-title.vo.fake";
import { makeFakeNonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo.fake";
import { makeFakeNonNegativeInt } from "@/domain/shared/value-objects/non-negative-int.vo.fake";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

describe('Product Entity', () => {
  describe('should be created with correct and accessible values', () => {
    const productsData: ProductProps[] = [
      {
        id: makeFakeUuid(),
        title: makeFakeProductTitle(),
        price: makeFakeMonetary(),
        createdAt: makeFakeNonFutureDate(),
        inStock: makeFakeNonNegativeInt(),
      },
      {
        id: makeFakeUuid(),
        title: makeFakeProductTitle(),
        price: makeFakeMonetary(),
        createdAt: undefined,
        inStock: undefined,
      },
    ];

    vi.useFakeTimers();
    
    test.each(productsData)('product index: %#', data => {
      const now = new Date();
      vi.setSystemTime(now);

      const product = new Product({ ...data });
      
      expect(product.id.value).toBe(data.id.value);
      expect(product.title.value).toBe(data.title.value);
      expect(product.price.value).toBe(data.price.value);
      expect(product.inStock.value).toBe(data.inStock?.value ?? 0);

      expect(product.createdAt.toDate().getTime())
        .toBe(
          (data.createdAt ?? new NonFutureDate(now)).toDate().getTime()
        );
    });

    vi.useRealTimers();
  });
});
