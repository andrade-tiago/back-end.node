import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { ProductOutput } from "@/application/dtos/ProductOutput";
import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";
import type { ProductGetPagedInput } from "./input";

export class ProductGetPagedUseCase {
  private readonly _positiveIntFactory: ProductGetPagedUseCaseDependencies['positiveIntFactory'];
  private readonly _productMapper: ProductGetPagedUseCaseDependencies['productMapper'];
  private readonly _productRepository: ProductGetPagedUseCaseDependencies['productRepository'];

  public constructor(dependencies: ProductGetPagedUseCaseDependencies) {
    this._positiveIntFactory = dependencies.positiveIntFactory;
    this._productMapper = dependencies.productMapper;
    this._productRepository = dependencies.productRepository;
  }

  public async execute(options: ProductGetPagedInput): Promise<ProductOutput[]> {
    const products = await this._productRepository.getPaged({
      pageNumber: this._positiveIntFactory.create(options.pageNumber),
      pageSize: this._positiveIntFactory.create(options.pageSize),
    });

    return products.map(this._productMapper.toOutput);
  }
}

type ProductGetPagedUseCaseDependencies = {
  positiveIntFactory: IPositiveIntFactory;
  productMapper: IProductMapper;
  productRepository: IProductRepository;
}
