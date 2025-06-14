import { FutureDateError } from "@/domain/errors/future-date-error";

export class NonFutureDate {
  public readonly value: number;

  private constructor(dateInMilliseconds: number) {
    this.value = dateInMilliseconds;
  }

  public static create(value?: number | Date | string): NonFutureDate {
    if (value === undefined) {
      return NonFutureDate.now();
    }
    const date = value instanceof Date ? value : new Date(value);

    const dateInMilliseconds = date.getTime();

    if (dateInMilliseconds > Date.now()) {
      throw new FutureDateError(date);
    }
    return new NonFutureDate(dateInMilliseconds);
  }

  public static now(): NonFutureDate {
    return new NonFutureDate(Date.now());
  }
}
