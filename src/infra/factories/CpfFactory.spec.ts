import type { ICpfParser } from "@/domain/parsers/ICpfParser";
import { testCpfFactory } from "@/domain/factories/ICpfFactory.test";
import { CpfFactory } from "./CpfFactory";

const mockCpfParser = { parse: value => value } as ICpfParser;

testCpfFactory({
  getInstanceFunc: () => new CpfFactory({ cpfParser: mockCpfParser }),
});
