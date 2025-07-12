import type { IProductFactory } from "@/domain/factories/IProductFactory";
import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { ProductOutput } from "@/application/dtos/ProductOutput";
import type { ProductCreateInput } from "./input";

export class ProductCreateUseCase {
  public constructor(
    private readonly _productRepository: IProductRepository,
    private readonly _productFactory: IProductFactory,
    private readonly _productMapper: IProductMapper,
  ) {}

  public async execute(data: ProductCreateInput): Promise<ProductOutput> {
    const newProduct = this._productFactory.create({
      title: data.title,
      price: data.price,
      inStock: data.inStock,
    });

    await this._productRepository.add(newProduct);

    return this._productMapper.toOutput(newProduct);
  }
}
