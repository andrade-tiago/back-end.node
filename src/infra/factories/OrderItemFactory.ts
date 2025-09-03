import type { IOrderItemFactory, OrderItemFactoryCreate } from "@/domain/factories/IOrderItemFactory";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IMoneyFactory } from "@/domain/factories/IMoneyFactory";
import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";
import { OrderItem } from "@/domain/entities/OrderItem";

type FactoryDependencies = {
  uuidFactory: OrderItemFactory['_uuidFactory'];
  moneyFactory: OrderItemFactory['_moneyFactory'];
  positiveIntFactory: OrderItemFactory['_positiveIntFactory'];
}

export class OrderItemFactory implements IOrderItemFactory
{
  private readonly _uuidFactory: IUuidFactory;
  private readonly _moneyFactory: IMoneyFactory;
  private readonly _positiveIntFactory: IPositiveIntFactory;

  public constructor(dependencies: FactoryDependencies)
  {
    this._uuidFactory = dependencies.uuidFactory;
    this._moneyFactory = dependencies.moneyFactory;
    this._positiveIntFactory = dependencies.positiveIntFactory;
  }

  public create(data: OrderItemFactoryCreate): OrderItem
  {
    return OrderItem.create({
      productId: this._uuidFactory.create(data.productId),
      unitPrice: this._moneyFactory.create(data.unitPrice),
      quantity: this._positiveIntFactory.create(data.quantity),
    });
  }
}
