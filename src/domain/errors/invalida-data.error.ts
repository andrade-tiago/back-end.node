import { AppError } from "./_app-error";

export class InvalidDataError extends AppError {
  public field: string | null;

  public constructor(message: string, props?: InvalidDataErrorProps) {
    super(message);

    this.field = props?.field ?? null;
  }
}

type InvalidDataErrorProps = {
  field?: string;
}
