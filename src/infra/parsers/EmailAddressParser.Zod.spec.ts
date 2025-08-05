import { testEmailParser } from "@/domain/parsers/IEmailAddressParser.test";
import { EmailAddressParser } from "./EmailAddressParser.Zod";

testEmailParser(
{
  getInstanceFunc: () => new EmailAddressParser(),
});
