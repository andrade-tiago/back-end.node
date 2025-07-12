import type { IProductFactory } from "@/domain/factories/IProductFactory";
import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { ProductOutput } from "@/application/dtos/ProductOutput";
import type { ProductCreateInput } from "./input";

export class ProductCreateUseCase {
  private readonly _productFactory: ProductCreateUseCaseDependencies['productFactory'];
  private readonly _productMapper: ProductCreateUseCaseDependencies['productMapper'];
  private readonly _productRepository: ProductCreateUseCaseDependencies['productRepository'];

  public constructor(dependencies: ProductCreateUseCaseDependencies) {
    this._productFactory = dependencies.productFactory;
    this._productMapper = dependencies.productMapper;
    this._productRepository = dependencies.productRepository;
  }

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

type ProductCreateUseCaseDependencies = {
  productFactory: IProductFactory;
  productMapper: IProductMapper;
  productRepository: IProductRepository;
}
