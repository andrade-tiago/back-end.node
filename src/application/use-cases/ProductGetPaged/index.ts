import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { ProductGetPagedInput } from "./input";
import type { ProductOutput } from "@/application/dtos/ProductOutput";

export class ProductGetPagedUseCase {
  public constructor(
    private readonly _productRepository: IProductRepository,
    private readonly _productMapper: IProductMapper,
  ) {}

  public async execute(options: ProductGetPagedInput): Promise<ProductOutput[]> {
    const products = await this._productRepository.getPaged({
      pageNumber: options.pageNumber,
      pageSize: options.pageSize,
    });

    return products.map(this._productMapper.toOutput);
  }
}
