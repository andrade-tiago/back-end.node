import { AppError } from "@/domain/errors/_app-error";

export class ConflictError extends AppError {
  public constructor(message: string) {
    super(message);
  }
}
