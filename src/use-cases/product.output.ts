import { Product } from "@/entities/product"

export type ProductOutput = {
  id: Product['id']['value'];
  name: string;
  description: string;
  price: number;
  stock: number;
}
