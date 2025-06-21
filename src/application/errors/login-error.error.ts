import { AppError } from "@/domain/errors/_app-error";
import { ApplicationErrorMessages } from "./_error-messages";

export class LoginError extends AppError {
  public constructor() {
    super(ApplicationErrorMessages.Login);
  }
}
