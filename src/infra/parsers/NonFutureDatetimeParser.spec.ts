import { testNonFutureDatetimeParser } from "@/domain/parsers/INonFutureDatetimeParser.test";
import { NonFutureDatetimeParser } from "./NonFutureDatetimeParser";

testNonFutureDatetimeParser({
  getInstanceFunc: () => new NonFutureDatetimeParser(),
});
