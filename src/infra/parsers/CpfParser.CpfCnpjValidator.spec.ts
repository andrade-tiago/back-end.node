import { testCpfParser } from "@/domain/parsers/ICpfParser.test";
import { CpfParser } from "./CpfParser.CpfCnpjValidator";

testCpfParser(
{
  getInstanceFunc: () => new CpfParser(),
});
