import { testMoneyParser } from "@/domain/parsers/IMoneyParser.test";
import { MoneyParser } from "./MoneyParser.Zod";

testMoneyParser({
  getInstanceFunc: () => new MoneyParser(),
});
