import { describe, it, expect } from 'vitest';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
import { mockOrderItem } from './OrderItem.mock';
import { InvalidDataError } from '@/domain/errors';
import { mockUuid } from '../value-objects/Uuid.mock';
import { mockNonFutureDatetime } from '../value-objects/NonFutureDatetime.mock';
import { mockMoney } from '../value-objects/Money.mock';
import { mockPositiveInt } from '../value-objects/PositiveInt.mock';

describe('Order Entity', () =>
{
  const testOrderId = mockUuid();
  const testUserId = mockUuid();
  const testCreatedAt = mockNonFutureDatetime();

  it('should create an Order with valid props', () =>
  {
    const item1 = mockOrderItem();
    const item2 = mockOrderItem();

    const items = [item1, item2];

    const order = Order.create(
    {
      id: testOrderId,
      userId: testUserId,
      createdAt: testCreatedAt,
      items: items,
    });

    expect(order).toBeInstanceOf(Order);
    expect(order.id).toBe(testOrderId);
    expect(order.userId).toBe(testUserId);
    expect(order.createdAt).toBe(testCreatedAt);
    expect(order.items).toHaveLength(items.length);

    expect(order.items[0]).toBe(item1);
    expect(order.items[1]).toBe(item2);
  });

  it('should calculate the total cost of the order', () =>
  {
    const item1 = mockOrderItem();
    const item2 = mockOrderItem();

    const order = Order.create(
    {
      id: testOrderId,
      userId: testUserId,
      createdAt: testCreatedAt,
      items: [item1, item2],
    });

    const expectedTotal =
      item1.getTotalCost().value + 
      item2.getTotalCost().value;

    expect(order.getTotalCost().value).toBeCloseTo(expectedTotal, 2);
  });

  it('should throw when created with empty items', () =>
  {
    expect(() =>
      Order.create({
        id: testOrderId,
        userId: testUserId,
        createdAt: testCreatedAt,
        items: [],
      })
    ).toThrowError(InvalidDataError);
  });

  it('should throw when created with duplicate productIds', () =>
  {
    const duplicateProductId = mockUuid();

    const item1 = OrderItem.create({
      productId: duplicateProductId,
      unitPrice: mockMoney(),
      quantity: mockPositiveInt(),
    });

    const item2 = OrderItem.create({
      productId: duplicateProductId,
      unitPrice: mockMoney(),
      quantity: mockPositiveInt(),
    });

    expect(() =>
      Order.create(
      {
        id: testOrderId,
        userId: testUserId,
        createdAt: testCreatedAt,
        items: [item1, item2],
      })
    ).toThrowError(InvalidDataError);
  });
});
