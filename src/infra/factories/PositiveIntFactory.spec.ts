import type { IPositiveIntParser } from "@/domain/parsers/IPositiveIntParser";
import { testPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory.test";
import { PositiveIntFactory } from "./PositiveIntFactory";

const positiveIntParser = { parse: value => value } satisfies IPositiveIntParser;

testPositiveIntFactory({
  getInstanceFunc: () => new PositiveIntFactory({ positiveIntParser }),
});
