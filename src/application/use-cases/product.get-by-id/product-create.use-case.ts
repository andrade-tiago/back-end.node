import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { ProductOutput } from "../product.output";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { ProductNotFoundError } from "@/application/errors/product-not-found.error";
import { IProductMapper } from "@/application/mappers/product.mapper";
import { IProductRepository } from "@/domain/repositories/product.repository";

export class ProductCreateUseCase {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _productRepository: IProductRepository,
    private readonly _productMapper: IProductMapper,
  ) {}

  public async execute(idStr: Uuid['value']): Promise<ProductOutput> {
    const idObj = this._uuidFactory.createFromString(idStr);

    const product = await this._productRepository.getById(idObj);

    if (!product) {
      throw new ProductNotFoundError(idObj);
    }

    return this._productMapper.toOutput(product);
  }
}
