import { testOrderMapper } from "@/domain/mappers/IOrderMapper.test";
import { OrderMapper } from "./OrderMapper";
import { mockOrderItemMapper } from "@/domain/mappers/IOrderItemMapper.mock";

const orderItemMapper = mockOrderItemMapper();

testOrderMapper({
  getInstanceFunc: () => new OrderMapper({ orderItemMapper }),
});
