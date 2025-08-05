import { testUuidParser } from "@/domain/parsers/IUuidParser.test";
import { UuidParser } from "./UuidParser.Zod";

testUuidParser(
{
  getInstanceFunc: () => new UuidParser(),
});
