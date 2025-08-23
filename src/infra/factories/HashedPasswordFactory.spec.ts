import { testHashedPasswordFactory } from "@/domain/factories/IHashedPasswordFactory.test";
import { HashedPasswordFactory } from "./HashedPasswordFactory";
import { IHashedPasswordParser } from "@/domain/parsers/IHashedPasswordParser";
import { IPasswordFactory } from "@/domain/factories/IPasswordFactory";
import { mockPassword } from "@/domain/value-objects/Password.mock";
import { IPasswordHasherService } from "@/domain/services/IPasswordHasherService";
import { mockHashedPassword } from "@/domain/value-objects/HashedPassword.mock";

const mockHashedPasswordParser = { parse: value => value } as IHashedPasswordParser;
const mockPasswordFactory = { create: mockPassword } as IPasswordFactory;
const mockPasswordHasherService =
{
  hash: async () => mockHashedPassword().value,
  compare: async () => true,
} satisfies IPasswordHasherService;

testHashedPasswordFactory({
  getInstanceFunc: () => new HashedPasswordFactory(
  {
    hashedPasswordParser: mockHashedPasswordParser,
    passwordFactory: mockPasswordFactory,
    passwordHasherService: mockPasswordHasherService,
  }),
});
