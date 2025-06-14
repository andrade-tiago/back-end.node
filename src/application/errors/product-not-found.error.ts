import { Product } from "@/domain/entities/product";

export class ProductNotFoundError extends Error {
  public constructor(id: Product['id']) {
    super(`Product with id "${id.value} not found`);
  }
}
