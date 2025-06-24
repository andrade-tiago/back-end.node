import { Product } from "@/domain/entities/product";
import { ProductOutput } from "../use-cases/product.output";

export interface IProductMapper {
  toOutput(product: Product): ProductOutput;
}
