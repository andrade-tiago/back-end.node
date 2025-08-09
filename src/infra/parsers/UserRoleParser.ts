import type { IUserRoleParser } from "@/domain/parsers/IUserRoleParser";
import { UserRoleEnum } from "@/domain/enums/UserRoleEnum";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class UserRoleParser implements IUserRoleParser
{
  public parse(value: string): UserRoleEnum
  {
    const formattedValue = value.trim().toLowerCase();

    const userRoleEnumValues = Object.values(UserRoleEnum);

    const valueIsAnUserRole = userRoleEnumValues.includes(formattedValue as UserRoleEnum);

    if (valueIsAnUserRole)
    {
      return formattedValue as UserRoleEnum;
    }
    throw new InvalidDataError(ErrorMessages.User.InvalidRole(value));
  }
}
