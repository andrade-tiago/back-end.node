import { Email } from "../../domain/entities/user/value-objects/email.vo";

export class ExistingUserError extends Error {
  public constructor(email: Email) {
    super(`User with email ${email.value} already exists`);
  }
}
