import { Product } from ".";

export interface IProductRepository {
  add(product: Product): Promise<void>;
  getById(id: Product['id']): Promise<Product>;
  getPaged(options: ProductGetPagedOptions): Promise<Product[]>;
}

export type ProductGetPagedOptions = {
  pageSize: number;
  pageNumber: number;
}
