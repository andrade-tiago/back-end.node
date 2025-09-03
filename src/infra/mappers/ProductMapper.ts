import type { IProductMapper } from "@/domain/mappers/IProductMapper";
import { Product } from "@/domain/entities/Product";
import { ProductOutput } from "@/application/dtos/ProductOutput";

export class ProductMapper implements IProductMapper
{
  public toOutput(product: Product): ProductOutput
  {
    return {
      id: product.id.value,
      title: product.title.value,
      price: product.price.value,
      inStock: product.inStock.value,
      createdAt: product.createdAt.value,
    };
  }
}
