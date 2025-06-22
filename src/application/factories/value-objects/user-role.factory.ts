import { UserRole, UserRoleEnum } from "@/domain/entities/user/value-objects/user-role.vo";

export interface IUserRoleFactory {
  create(role: string | UserRoleEnum): UserRole;
}
