import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class NonNegativeInt {
  public readonly value: number;

  constructor(value: number) {
    if (!valueIsNumeric(value)) {
      throw new InvalidDataError(DomainErrorMessages.Number.NonNumeric);
    }
    if (!Number.isInteger(value)) {
      throw new InvalidDataError(DomainErrorMessages.Number.NonInteger);
    }
    if (value < 0) {
      throw new InvalidDataError(DomainErrorMessages.Number.Negative);
    }

    this.value = value;
  }
}
