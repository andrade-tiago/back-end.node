import type { IMoneyParser } from "@/domain/parsers/IMoneyParser";
import { testMoneyFactory } from "@/domain/factories/IMoneyFactory.test";
import { MoneyFactory } from "./MoneyFactory";

const moneyParser = { parse: value => value } satisfies IMoneyParser;

testMoneyFactory({
  getInstanceFunc: () => new MoneyFactory({ moneyParser }),
});
