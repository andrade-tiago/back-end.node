import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class NonFutureDate {
  private readonly _value: number;

  private constructor(dateInMilliseconds: number) {
    this._value = dateInMilliseconds;
  }

  public toDate(): Date {
    return new Date(this._value);
  }

  public static create(value?: number | string | Date): NonFutureDate {
    if (value === undefined) {
      return NonFutureDate.now();
    }
    const date = value instanceof Date ? value : new Date(value);

    const dateInMilliseconds = date.getTime();

    if (!valueIsNumeric(dateInMilliseconds)) {
      throw new InvalidDataError(DomainErrorMessages.Date.InvalidDate);
    }
    if (dateInMilliseconds > Date.now()) {
      throw new InvalidDataError(DomainErrorMessages.Date.FutureDate);
    }
    return new NonFutureDate(dateInMilliseconds);
  }

  public static now(): NonFutureDate {
    return new NonFutureDate(Date.now());
  }
}
