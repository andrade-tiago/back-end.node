import { testNonFutureDatetimeParser } from "@/domain/parsers/INonFutureDatetimeParser.test";
import { NonFutureDatetimeParser } from "./NonFutureDatetimeParser.Zod";

testNonFutureDatetimeParser({
  getInstanceFunc: () => new NonFutureDatetimeParser(),
});
