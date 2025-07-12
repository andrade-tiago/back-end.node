import { AppError } from "@/domain/errors/__AppError";

export class ConflictError extends AppError {
  public constructor(message: string) {
    super(message);
  }
}
