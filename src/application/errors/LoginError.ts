import { AppError } from "@/domain/errors/__AppError";
import { ErrorMessages } from "./__ErrorMessages";

export class LoginError extends AppError {
  public constructor() {
    super(ErrorMessages.Login);
  }
}
