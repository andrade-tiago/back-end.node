import { ProductGetPagedInput } from "./product-get-paged.input";
import { ProductOutput } from "../product.output";
import { IProductMapper } from "@/application/mappers/product.mapper";
import { IProductRepository } from "@/domain/repositories/product.repository";

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
