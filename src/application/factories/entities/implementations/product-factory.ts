import { Product, ProductProps } from "@/domain/entities/product";
import { IProductFactory, ProductCreateProps } from "../product.factory";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { IUuidFactory } from "../../value-objects/uuid.factory";
import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { IMonetaryFactory } from "../../value-objects/monetary.factory";
import { ProductTitle } from "@/domain/entities/product/value-objects/product-title.vo";
import { IProductTitleFactory } from "../../value-objects/product-title.factory";
import { INonNegativeIntFactory } from "../../value-objects/non-negative-int.factory";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { INonFutureDateFactory } from "../../value-objects/non-future-date.factory";

export class ProductFactory implements IProductFactory {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _productTitleFactory: IProductTitleFactory,
    private readonly _monetaryFactory: IMonetaryFactory,
    private readonly _nonNegativeIntFactory: INonNegativeIntFactory,
    private readonly _nonFutureDateFactory: INonFutureDateFactory,
  ) {}

  public create(props: ProductCreateProps): Product {
    return new Product({
      id: this.resolveId(props.id),
      title: this.resolveTitle(props.title),
      price: this.resolvePrice(props.price),
      inStock: this.resolveInStock(props.inStock),
      createdAt: this.resolveCreatedAt(props.createdAt),
    });
  }

  private resolveId(id: ProductCreateProps['id']): ProductProps['id'] {
    if (id instanceof Uuid) {
      return id;
    }
    if (id) {
      return this._uuidFactory.createFromString(id);
    }
    return this._uuidFactory.generate();
  }
  private resolveTitle(title: ProductCreateProps['title']): ProductProps['title'] {
    return title instanceof ProductTitle ? title : this._productTitleFactory.create(title);
  }
  private resolvePrice(price: ProductCreateProps['price']): ProductProps['price'] {
    return price instanceof Monetary ? price : this._monetaryFactory.create(price);
  }
  private resolveInStock(inStock: ProductCreateProps['inStock']): ProductProps['inStock'] {
    return typeof inStock === 'number' ? this._nonNegativeIntFactory.create(inStock) : inStock;
  }
  private resolveCreatedAt(datetime: ProductCreateProps['createdAt']): ProductProps['createdAt'] {
    if (datetime instanceof NonFutureDate || typeof datetime === 'undefined') {
      return datetime;
    }
    return this._nonFutureDateFactory.create(datetime);
  }
}
