import { testHashedPasswordParser } from "@/domain/parsers/IHashedPasswordParser.test";
import { HashedPasswordParser } from "./HashedPasswordParser";

testHashedPasswordParser(
{
  getInstanceFunc: () => new HashedPasswordParser(),
});
