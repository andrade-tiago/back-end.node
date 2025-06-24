import { Product } from "@/domain/entities/product";

export type ProductOutput = {
  id: Product['id']['value'];
  title: string;
  price: number;
  inStock: number;
  createdAt: ReturnType<Date['toISOString']>;
}
