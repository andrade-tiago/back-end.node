import { OrderOutput } from "@/application/use-cases/order.output";
import { Order } from "@/domain/entities/order";
import { IOrderMapper } from "../order.mapper";

export class OrderMapper implements IOrderMapper {
  public toOutput(order: Order): OrderOutput {
    const items = order.items.map(
      item => ({
        productId: item.productId.value,
        unitPrice: item.unitPrice.value,
        quantity: item.quantity.value,
      })
    );

    return {
      id: order.id.value,
      userId: order.userId.value,
      items: items,
      createdAt: new Date(order.createdAt.value).toISOString(),
    };
  }
}