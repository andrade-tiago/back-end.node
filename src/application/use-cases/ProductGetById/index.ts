import type { ProductOutput } from "@/application/dtos/ProductOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class ProductCreateUseCase {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _productRepository: IProductRepository,
    private readonly _productMapper: IProductMapper,
  ) {}

  public async execute(id: UuidCreateValue): Promise<ProductOutput> {
    const idObj = this._uuidFactory.create(id);

    const product = await this._productRepository.getById(idObj);

    if (!product) {
      throw new NotFoundError(ErrorMessages.Products.NotFoundById(idObj.value));
    }
    return this._productMapper.toOutput(product);
  }
}
