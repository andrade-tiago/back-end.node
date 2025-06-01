import { IEmailParser } from "@/domain/parsers/email.parser";

export class Email {
  public readonly value: string;

  constructor(
    emailValidator: IEmailParser,
    emailStr: string,
  ) {
    this.value = emailValidator.parse(emailStr);
  }
}