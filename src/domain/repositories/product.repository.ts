import { Product } from "../entities/product";

export interface IProductRepository {
  add(product: Product): Promise<void>;
  getById(id: Product['id']): Promise<Product | undefined>;
  getPaged(options: ProductGetPagedOptions): Promise<Product[]>;
  getMany(ids: Array<Product['id']>): Promise<Product[]>;
}

export type ProductGetPagedOptions = {
  pageSize: number;
  pageNumber: number;
}
