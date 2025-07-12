import type { ProductOutput } from "@/application/dtos/ProductOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class ProductCreateUseCase {
  private readonly _productMapper: ProductCreateUseCaseDependencies['productMapper'];
  private readonly _productRepository: ProductCreateUseCaseDependencies['productRepository'];
  private readonly _uuidFactory: ProductCreateUseCaseDependencies['uuidFactory'];

  public constructor(dependencies: ProductCreateUseCaseDependencies) {
    this._productMapper = dependencies.productMapper;
    this._productRepository = dependencies.productRepository;
    this._uuidFactory = dependencies.uuidFactory;
  }

  public async execute(id: UuidCreateValue): Promise<ProductOutput> {
    const idObj = this._uuidFactory.create(id);

    const product = await this._productRepository.getById(idObj);

    if (!product) {
      throw new NotFoundError(ErrorMessages.Products.NotFoundById(idObj.value));
    }
    return this._productMapper.toOutput(product);
  }
}

type ProductCreateUseCaseDependencies = {
  uuidFactory: IUuidFactory;
  productRepository: IProductRepository;
  productMapper: IProductMapper;
}
