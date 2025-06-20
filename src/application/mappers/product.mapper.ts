import { Product } from "@/domain/entities/product";
import { ProductOutput } from "../use-cases/product.output";
import { OrderItem } from "@/domain/entities/order/value-objects/order-item.vo";

export interface IProductMapper {
  toOutput(product: Product): ProductOutput;
  toOrderItem(product: Product): OrderItem;
}
