import type { INonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser";
import { testNonNegativeIntFactory } from "@/domain/factories/INonNegativeIntFactory.test";
import { NonNegativeIntFactory } from "./NonNegativeIntFactory";

const nonNegativeIntParser = { parse: value => value } satisfies INonNegativeIntParser;

testNonNegativeIntFactory({
  getInstanceFunc: () => new NonNegativeIntFactory({ nonNegativeIntParser }),
});
