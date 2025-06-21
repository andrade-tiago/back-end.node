import { AppError } from "./_app-error";

export class InternalError extends AppError {
  public constructor(message: string) {
    super(message);
  }
}
