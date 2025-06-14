import { Product } from "@/domain/entities/product";

type ProductCreateProps = {
  id?: Product['id'] | Product['id']['value'];
  title: Product['title'] | string;
  price: Product['price'] | number;
  inStock?: Product['inStock'] | number;
}

export interface IProductFactory {
  create(props: ProductCreateProps): Product;
}
