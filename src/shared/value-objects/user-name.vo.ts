import { IUserNameParser } from "@/parsers/user-name.parser";

export class UserName {
  public readonly value: string;

  constructor(
    userNameValidator: IUserNameParser,
    userNameStr: string,
  ) {
    this.value = userNameValidator.parse(userNameStr);
  }
}
