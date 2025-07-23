import { faker } from "@faker-js/faker";
import { UserRoleEnum } from "./UserRoleEnum";

export const mockUserRole = (): UserRoleEnum =>
{
  return faker.helpers.enumValue(UserRoleEnum);
};
