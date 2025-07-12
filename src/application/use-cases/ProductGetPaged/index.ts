import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { ProductGetPagedInput } from "./input";
import type { ProductOutput } from "@/application/dtos/ProductOutput";
import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";

export class ProductGetPagedUseCase {
  public constructor(
    private readonly _productRepository: IProductRepository,
    private readonly _productMapper: IProductMapper,
    private readonly _positiveIntFactory: IPositiveIntFactory,
  ) {}

  public async execute(options: ProductGetPagedInput): Promise<ProductOutput[]> {
    const products = await this._productRepository.getPaged({
      pageNumber: this._positiveIntFactory.create(options.pageNumber),
      pageSize: this._positiveIntFactory.create(options.pageSize),
    });

    return products.map(this._productMapper.toOutput);
  }
}
