import { UserRoleEnum, UserRole } from "@/domain/entities/user/value-objects/user-role.vo";
import { IUserRoleFactory } from "../user-role.factory";

export class UserRoleFactory implements IUserRoleFactory {
  create(role: string | UserRoleEnum): UserRole {
    return new UserRole(role);
  }
}
