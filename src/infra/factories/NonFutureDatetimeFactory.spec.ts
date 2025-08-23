import type { INonFutureDatetimeParser } from "@/domain/parsers/INonFutureDatetimeParser";
import { testNonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory.test";
import { NonFutureDatetimeFactory } from "./NonFutureDatetimeFactory";

const nonFutureDatetimeParser = {
  parse: value => new Date(value).toISOString(),
} satisfies INonFutureDatetimeParser;

testNonFutureDatetimeFactory({
  getInstanceFunc: () => new NonFutureDatetimeFactory({ nonFutureDatetimeParser }),
});
