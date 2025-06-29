import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalid-data.error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class Monetary {
  public readonly value: number;

  public constructor(value: number) {
    if (!valueIsNumeric(value)) {
      throw new InvalidDataError(DomainErrorMessages.Number.NonNumeric);
    }
    if (value < 0) {
      throw new InvalidDataError(DomainErrorMessages.Number.Negative);
    }
    const twoDecimalCasesFixedValue = Number(value.toFixed(2));

    this.value = twoDecimalCasesFixedValue;
  }
}
