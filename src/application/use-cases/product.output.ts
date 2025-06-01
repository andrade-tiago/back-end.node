import { Product } from "@/domain/entities/product";

export type ProductOutput = {
  id: Product['id']['value'];
  name: string;
  description: string;
  price: number;
  stock: number;
}
