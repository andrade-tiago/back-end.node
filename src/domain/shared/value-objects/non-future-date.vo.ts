import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";

export class NonFutureDate {
  public readonly value: number;

  private constructor(dateInMilliseconds: number) {
    this.value = dateInMilliseconds;
  }

  public static create(value?: number | string | Date): NonFutureDate {
    if (value === undefined) {
      return NonFutureDate.now();
    }
    const date = value instanceof Date ? value : new Date(value);

    const dateInMilliseconds = date.getTime();

    if (dateInMilliseconds > Date.now()) {
      throw new InvalidDataError(DomainErrorMessages.Date.FutureDate);
    }
    return new NonFutureDate(dateInMilliseconds);
  }

  public static now(): NonFutureDate {
    return new NonFutureDate(Date.now());
  }
}
