import { Product, type ProductProps } from './Product';
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { Uuid } from '@/domain/value-objects/Uuid';
import { ProductTitle } from '@/domain/value-objects/ProductTitle';
import { Money } from '@/domain/value-objects/Money';
import { NonNegativeInt } from '@/domain/value-objects/NonNegativeInt';
import { NonFutureDatetime } from '@/domain/value-objects/NonFutureDatetime';


describe('Product Entity', () =>
{
  const testUuid = Uuid.unsafeCreate(faker.string.uuid());
  const testTitle = ProductTitle.unsafeCreate(faker.commerce.productName());
  const testMoney = Money.unsafeCreate(faker.number.float({ min: 0.01 }));
  const testNonNegativeInt = NonNegativeInt.unsafeCreate(faker.number.int({ min: 0 }));
  const testDatetime = NonFutureDatetime.unsafeCreate(faker.date.past().toISOString());

  const props: ProductProps =
  {
    id: testUuid,
    title: testTitle,
    price: testMoney,
    inStock: testNonNegativeInt,
    createdAt: testDatetime,
  };

  it('should create a Product with valid props', () =>
  {
    const product = Product.create(props);

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(props.id);
    expect(product.title).toBe(props.title);
    expect(product.price).toBe(props.price);
    expect(product.inStock).toBe(props.inStock);
    expect(product.createdAt).toBe(props.createdAt);
  });
});
