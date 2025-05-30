import { UserName } from "./user-name.vo";

export interface IUserNameFactory {
  create(userNameStr: string): UserName;
}
