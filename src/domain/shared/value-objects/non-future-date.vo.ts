import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class NonFutureDate {
  private readonly _value: Date;

  public constructor(value: number | string | Date = new Date()) {
    const date = value instanceof Date ? value : new Date(value);

    const dateInMilliseconds = date.getTime();

    if (!valueIsNumeric(dateInMilliseconds)) {
      throw new InvalidDataError(DomainErrorMessages.Date.InvalidDate);
    }
    if (dateInMilliseconds > Date.now()) {
      throw new InvalidDataError(DomainErrorMessages.Date.FutureDate);
    }
    this._value = date;
  }

  public toDate(): Date {
    return this._value;
  }
}
