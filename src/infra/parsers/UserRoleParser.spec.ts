import { testUserRoleParser } from "@/domain/parsers/IUserRoleParser.test";
import { UserRoleParser } from "./UserRoleParser";

testUserRoleParser({
  getInstanceFunc: () => new UserRoleParser(),
});
