import { ProductOutput } from "@/application/use-cases/product.output";
import { Product } from "@/domain/entities/product";
import { IProductMapper } from "../product.mapper";

export class ProductMapper implements IProductMapper {
  public toOutput(product: Product): ProductOutput {
    return {
      id: product.id.value,
      title: product.title.value,
      price: product.price.value,
      inStock: product.inStock.value,
      createdAt: product.createdAt.toDate().toISOString(),
    };
  }
}
