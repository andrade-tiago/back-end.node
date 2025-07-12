import type { Product } from "@/domain/entities/Product";

export type ProductOutput = {
  id: Product['id']['value'];
  title: Product['title']['value'];
  price: Product['price']['value'];
  inStock: Product['inStock']['value'];
  createdAt: Product['createdAt']['value'];
}
