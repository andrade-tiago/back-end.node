import { testUserFactory } from "@/domain/factories/IUserFactory.test";
import { UserFactory } from "./UserFactory";
import { mockCpfFactory } from "@/domain/factories/ICpfFactory.mock";
import { mockEmailAddressFactory } from "@/domain/factories/IEmailAddressFactory.mock";
import { mockFullNameFactory } from "@/domain/factories/IFullNameFactory.mock";
import { mockNonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory.mock";
import { mockUserRoleParser } from "@/domain/parsers/IUserRoleParser.mock";
import { mockUuidFactory } from "@/domain/factories/IUuidFactory.mock";

testUserFactory({
  getInstanceFunc: () => new UserFactory(
  {
    cpfFactory: mockCpfFactory(),
    emailAddressFactory: mockEmailAddressFactory(),
    fullNameFactory: mockFullNameFactory(),
    nonFutureDatetimeFactory: mockNonFutureDatetimeFactory(),
    userRoleParser: mockUserRoleParser(),
    uuidFactory: mockUuidFactory(),
  }),
});
