import { testPasswordFactory } from "@/domain/factories/IPasswordFactory.test";
import { PasswordFactory } from "./PasswordFactory";
import { IPasswordParser } from "@/domain/parsers/IPasswordParser";

const passwordParser = { parse: value => value } satisfies IPasswordParser;

testPasswordFactory({
  getInstanceFunc: () => new PasswordFactory({ passwordParser }),
});
