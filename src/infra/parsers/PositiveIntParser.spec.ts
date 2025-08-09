import { testPositiveIntParser } from "@/domain/parsers/IPositiveIntParser.test";
import { PositiveIntParser } from "./PositiveIntParser";

testPositiveIntParser({
  getInstanceFunc: () => new PositiveIntParser(),
});
