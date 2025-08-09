import { testNonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser.test";
import { NonNegativeIntParser } from "./NonNegativeIntParser";

testNonNegativeIntParser({
  getInstanceFunc: () => new NonNegativeIntParser(),
});
