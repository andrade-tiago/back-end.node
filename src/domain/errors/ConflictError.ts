import { AppError } from "./__AppError";

export class ConflictError extends AppError {
  public constructor(message: string) {
    super(message);
  }
}
