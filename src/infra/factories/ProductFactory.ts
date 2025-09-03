import { Product } from "@/domain/entities/Product";
import { IMoneyFactory } from "@/domain/factories/IMoneyFactory";
import { INonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory";
import { INonNegativeIntFactory } from "@/domain/factories/INonNegativeIntFactory";
import { IProductFactory, ProductFactoryCreate } from "@/domain/factories/IProductFactory";
import { IProductTitleFactory } from "@/domain/factories/IProductTitleFactory";
import { IUuidFactory } from "@/domain/factories/IUuidFactory";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";
import { NonNegativeInt } from "@/domain/value-objects/NonNegativeInt";

type FactoryDependencies = {
  moneyFactory: ProductFactory['_moneyFactory'];
  nonFutureDatetimeFactory: ProductFactory['_nfdFactory'];
  nonNegativeIntFactory: ProductFactory['_nniFactory'];
  productTitleFactory: ProductFactory['_ptFactory'];
  uuidFactory: ProductFactory['_uuidFactory'];
}

export class ProductFactory implements IProductFactory
{
  private readonly _moneyFactory: IMoneyFactory;
  private readonly _nfdFactory: INonFutureDatetimeFactory;
  private readonly _nniFactory: INonNegativeIntFactory;
  private readonly _ptFactory: IProductTitleFactory;
  private readonly _uuidFactory: IUuidFactory;

  public constructor(dependencies: FactoryDependencies)
  {
    this._moneyFactory = dependencies.moneyFactory;
    this._nfdFactory = dependencies.nonFutureDatetimeFactory;
    this._nniFactory = dependencies.nonNegativeIntFactory;
    this._ptFactory = dependencies.productTitleFactory;
    this._uuidFactory = dependencies.uuidFactory;
  }

  public create(data: ProductFactoryCreate): Product
  {
    return Product.create(
    {
      id: data.id
        ? this._uuidFactory.create(data.id)
        : this._uuidFactory.generate(),

      title: this._ptFactory.create(data.title),
      price: this._moneyFactory.create(data.price),
      
      inStock: data.inStock
        ? this._nniFactory.create(data.inStock)
        : NonNegativeInt.ZERO,
      
      createdAt: data.createdAt
        ? this._nfdFactory.create(data.createdAt)
        : NonFutureDatetime.now(),
    });
  }
}
