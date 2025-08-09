import type { IEmailAddressParser } from "@/domain/parsers/IEmailAddressParser";
import { testEmailAddressFactory } from "@/domain/factories/IEmailAddressFactory.test";
import { EmailAddressFactory } from "./EmailAddressFactory";

const mockEmailParser = { parse: value => value } as IEmailAddressParser;

testEmailAddressFactory({
  getInstanceFunc: () => new EmailAddressFactory({ emailAddressParser: mockEmailParser }),
});
