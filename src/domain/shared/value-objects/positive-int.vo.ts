import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalid-data.error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class PositiveInt {
  public readonly value: number;

  public constructor(value: number) {
    if (!valueIsNumeric(value)) {
      throw new InvalidDataError(DomainErrorMessages.Number.NonNumeric);
    }
    if (!Number.isInteger(value)) {
      throw new InvalidDataError(DomainErrorMessages.Number.NonInteger);
    }
    if (value <= 0) {
      throw new InvalidDataError(DomainErrorMessages.Number.NonPositive);
    }

    this.value = value;
  }
}
