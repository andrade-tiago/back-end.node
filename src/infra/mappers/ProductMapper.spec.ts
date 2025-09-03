import { testProductMapper } from "@/domain/mappers/IProductMapper.test";
import { ProductMapper } from "./ProductMapper";

testProductMapper({
  getInstanceFunc: () => new ProductMapper(),
});
