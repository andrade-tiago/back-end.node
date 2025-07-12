import { AppError } from "./__AppError";

export class InternalError extends AppError {
  public constructor(message: string) {
    super(message);
  }
}
