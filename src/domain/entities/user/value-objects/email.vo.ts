import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";

export class Email {
  // ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  private static readonly emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public readonly value: string;

  public constructor(emailStr: string) {
    emailStr = emailStr.trim();

    if (!Email.emailRegex.test(emailStr)) {
      throw new InvalidDataError(DomainErrorMessages.User.InvalidEmail(emailStr));
    }

    this.value = emailStr;
  }
}