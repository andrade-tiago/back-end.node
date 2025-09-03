import { OrderItemOutput } from "@/application/dtos/OrderItemOutput";
import { OrderItem } from "@/domain/entities/OrderItem";
import { IOrderItemMapper } from "@/domain/mappers/IOrderItemMapper";

export class OrderItemMapper implements IOrderItemMapper
{
  public toOutput(item: OrderItem): OrderItemOutput
  {
    return {
      productId: item.productId.value,
      unitPrice: item.unitPrice.value,
      quantity: item.quantity.value,
    };
  }
}
