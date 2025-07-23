import { OrderItem, type OrderItemProps } from './OrderItem';
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { Uuid } from '@/domain/value-objects/Uuid';
import { Money } from '@/domain/value-objects/Money';
import { PositiveInt } from '@/domain/value-objects/PositiveInt';

describe('OrderItem Entity', () =>
{
  const testProductId = Uuid.unsafeCreate(faker.string.uuid());
  const testUnitPrice = Money.unsafeCreate(faker.number.float({ min: 0.01 }));
  const testQuantity = PositiveInt.unsafeCreate(faker.number.int({ min: 1 }));

  const props: OrderItemProps = {
    productId: testProductId,
    unitPrice: testUnitPrice,
    quantity: testQuantity,
  };

  it('should create an OrderItem with valid props', () =>
  {
    const item = OrderItem.create(props);

    expect(item).toBeInstanceOf(OrderItem);
    expect(item.productId).toBe(props.productId);
    expect(item.unitPrice).toBe(props.unitPrice);
    expect(item.quantity).toBe(props.quantity);
  });

  it('should calculate the total cost correctly', () =>
  {
    const item = OrderItem.create(props);
    const expectedTotal = testUnitPrice.value * testQuantity.value;
    const totalCost = item.getTotalCost();

    expect(totalCost).toBeInstanceOf(Money);
    expect(totalCost.value).toBeCloseTo(expectedTotal, 2);
  });
});
