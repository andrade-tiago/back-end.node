import { testOrderItemFactory } from "@/domain/factories/IOrderItemfactory.test";
import { OrderItemFactory } from "./OrderItemFactory";
import { mockMoneyFactory } from "@/domain/factories/IMoneyFactory.mock";
import { mockPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory.mock";
import { mockUuidFactory } from "@/domain/factories/IUuidFactory.mock";

testOrderItemFactory({
  getInstanceFunc: () => new OrderItemFactory({
    moneyFactory: mockMoneyFactory(),
    positiveIntFactory: mockPositiveIntFactory(),
    uuidFactory: mockUuidFactory(),
  }),
});
