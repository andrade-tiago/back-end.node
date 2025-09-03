import { testOrderFactory } from "@/domain/factories/IOrderFactory.test";
import { OrderFactory } from "./OrderFactory";
import { mockUuidFactory } from "@/domain/factories/IUuidFactory.mock";
import { mockNonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory.mock";

const uuidFactory = mockUuidFactory();
const nonFutureDatetimeFactory = mockNonFutureDatetimeFactory();

testOrderFactory({
  getInstanceFunc: () => new OrderFactory({ uuidFactory, nonFutureDatetimeFactory }),
});
