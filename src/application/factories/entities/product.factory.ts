import { Product } from "@/domain/entities/product";

type ProductCreateProps = {
  id?: Product['id'] | Product['id']['value'];
  name: Product['name'] | Product['name']['value'];
  description: Product['description'] | Product['description']['value'];
  price: Product['price'] | Product['price']['value'];
  stock?: Product['stock'] | Product['stock']['value'];
}

export interface IProductFactory {
  create(props: ProductCreateProps): Product;
}
