import { IProductRepository } from "@/repositories/product.repository";
import { ProductOutput } from "../product.output";
import { ProductCreateInput } from "./product-create.input";
import { IProductFactory } from "@/entities/product.factory";
import { IProductMapper } from "@/mappers/product.mapper";

export class ProductCreateUseCase {
  public constructor(
    private readonly _productRepository: IProductRepository,
    private readonly _productFactory: IProductFactory,
    private readonly _productMapper: IProductMapper,
  ) {}

  public async execute(data: ProductCreateInput): Promise<ProductOutput> {
    const newProduct = this._productFactory.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    });

    await this._productRepository.add(newProduct);

    return this._productMapper.toOutput(newProduct);
  }
}
