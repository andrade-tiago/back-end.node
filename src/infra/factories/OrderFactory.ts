import type { INonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory";
import type { IOrderFactory, OrderFactoryCreate } from "@/domain/factories/IOrderFactory";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import { Order } from "@/domain/entities/Order";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";

type FactoryDependencies = {
  uuidFactory: IUuidFactory;
  nonFutureDatetimeFactory: INonFutureDatetimeFactory;
}

export class OrderFactory implements IOrderFactory
{
  private readonly _uuidFactory: IUuidFactory;
  private readonly _nfdFactory: INonFutureDatetimeFactory;

  public constructor(dependencies: FactoryDependencies)
  {
    this._uuidFactory = dependencies.uuidFactory;
    this._nfdFactory = dependencies.nonFutureDatetimeFactory;
  }

  public create(props: OrderFactoryCreate): Order
  {
    return Order.create(
    {
      id: props.id
        ? this._uuidFactory.create(props.id)
        : this._uuidFactory.generate(),

      userId: this._uuidFactory.create(props.userId),
      items: props.items,

      createdAt: props.createdAt
        ? this._nfdFactory.create(props.createdAt)
        : NonFutureDatetime.now()
    });
  }
}
