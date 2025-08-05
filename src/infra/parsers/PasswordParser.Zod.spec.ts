import { testPasswordParser } from "@/domain/parsers/IPasswordParser.test";
import { PasswordParser } from "./PasswordParser.Zod";

testPasswordParser(
{
  getInstanceFunc: () => new PasswordParser(),
});
