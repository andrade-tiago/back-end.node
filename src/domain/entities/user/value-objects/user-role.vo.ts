import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalid-data.error";

export enum UserRoleEnum {
  Admin = 'admin',
  User = 'user',
}

export class UserRole {
  public readonly value: UserRoleEnum;

  public constructor(roleStr: string) {
    roleStr = roleStr.trim();

    if (!UserRole.isValid(roleStr)) {
      throw new InvalidDataError(DomainErrorMessages.User.InvalidRole(roleStr));
    }
    this.value = roleStr;
  }

  private static isValid(value: string): value is UserRoleEnum {
    return Object.values(UserRoleEnum).includes(value as UserRoleEnum);
  }
}
