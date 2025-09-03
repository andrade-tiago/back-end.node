import type { IUserRoleParser } from "./IUserRoleParser";
import type { UserRoleEnum } from "@/domain/enums/UserRoleEnum";

export const mockUserRoleParser = (): IUserRoleParser =>
{
  return {
    parse: value => value as UserRoleEnum,
  };
};
