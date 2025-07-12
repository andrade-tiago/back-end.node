import { AppError } from "@/domain/errors/__AppError";

export class NotFoundError extends AppError {
  public constructor(message: string) {
    super(message);
  }
}
