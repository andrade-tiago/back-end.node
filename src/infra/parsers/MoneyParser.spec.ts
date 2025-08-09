import { testMoneyParser } from "@/domain/parsers/IMoneyParser.test";
import { MoneyParser } from "./MoneyParser";

testMoneyParser({
  getInstanceFunc: () => new MoneyParser(),
});
