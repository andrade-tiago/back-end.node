import { UserName } from "@/domain/entities/user/value-objects/user-name.vo";

export interface IUserNameFactory {
  create(userNameStr: string): UserName;
}
