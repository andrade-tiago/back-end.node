import { testOrderItemMapper } from "@/domain/mappers/IOrderItemMapper.test";
import { OrderItemMapper } from "./OrderItemMapper";

testOrderItemMapper({
  getInstanceFunc: () => new OrderItemMapper(),
});
