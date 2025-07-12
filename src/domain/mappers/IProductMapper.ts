import type { Product } from "@/domain/entities/Product";
import type { ProductOutput } from "@/application/dtos/ProductOutput";

export interface IProductMapper {
  toOutput(product: Product): ProductOutput;
}
