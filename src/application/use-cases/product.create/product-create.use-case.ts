import { IProductRepository } from "@/domain/entities/product/product.repository";
import { ProductOutput } from "../product.output";
import { ProductCreateInput } from "./product-create.input";
import { IProductMapper } from "@/application/mappers/product.mapper";
import { IProductFactory } from "@/application/factories/entities/product.factory";

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
