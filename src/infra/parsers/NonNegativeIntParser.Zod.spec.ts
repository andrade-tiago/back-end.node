import { testNonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser.test";
import { NonNegativeIntParser } from "./NonNegativeIntParser.Zod";

testNonNegativeIntParser({
  getInstanceFunc: () => new NonNegativeIntParser(),
});
