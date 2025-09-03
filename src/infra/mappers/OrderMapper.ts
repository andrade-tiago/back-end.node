import { OrderOutput } from "@/application/dtos/OrderOutput";
import { Order } from "@/domain/entities/Order";
import { IOrderItemMapper } from "@/domain/mappers/IOrderItemMapper";
import { IOrderMapper } from "@/domain/mappers/IOrderMapper";

type MapperDependencies = {
  orderItemMapper: OrderMapper['_orderItemMapper'];
}

export class OrderMapper implements IOrderMapper
{
  private readonly _orderItemMapper: IOrderItemMapper;

  public constructor(dependencies: MapperDependencies)
  {
    this._orderItemMapper = dependencies.orderItemMapper;
  }

  public toOutput(order: Order): OrderOutput
  {
    return {
      id: order.id.value,
      userId: order.userId.value,
      createdAt: order.createdAt.value,
      items: order.items.map(this._orderItemMapper.toOutput),
    };
  }
}
