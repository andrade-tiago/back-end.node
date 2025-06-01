import { UserName } from "@/domain/value-objects/user-name.vo";

export interface IUserNameFactory {
  create(userNameStr: string): UserName;
}
