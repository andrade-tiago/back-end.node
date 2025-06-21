import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { ProductOutput } from "../product.output";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { IProductMapper } from "@/application/mappers/product.mapper";
import { IProductRepository } from "@/domain/repositories/product.repository";
import { NotFoundError } from "@/application/errors/not-found.error";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";

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
      throw new NotFoundError(ApplicationErrorMessages.Products.NotFoundById(idObj.value));
    }

    return this._productMapper.toOutput(product);
  }
}
