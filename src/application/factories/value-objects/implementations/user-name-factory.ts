import { UserName } from "@/domain/entities/user/value-objects/user-name.vo";
import { IUserNameFactory } from "../user-name.factory";

export class UserNameFactory implements IUserNameFactory {
  public create(userNameStr: string): UserName {
    return new UserName(userNameStr);
  }
}
