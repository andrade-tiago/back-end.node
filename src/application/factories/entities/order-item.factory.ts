import { OrderItem, OrderItemProps } from "@/domain/entities/order-item";

export interface IOrderItemFactory {
  create(data: OrderItemFactoryCreate): OrderItem;
}

export type OrderItemFactoryCreate = {
  productId: OrderItemProps['productId'] | OrderItemProps['productId']['value'],
  unitPrice: OrderItemProps['unitPrice'] | OrderItemProps['unitPrice']['value'],
  quantity: OrderItemProps['quantity'] | OrderItemProps['quantity']['value'],
}
