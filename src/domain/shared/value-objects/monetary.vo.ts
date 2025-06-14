import { NegativeValueError } from "@/domain/errors/negative-value-error";
import { NonNumericValueError } from "@/domain/errors/non-numeric-value-error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class Monetary {
  public readonly value: number;

  public constructor(value: number) {
    if (!valueIsNumeric(value)) {
      throw new NonNumericValueError(value);
    }
    if (value < 0) {
      throw new NegativeValueError(value);
    }
    const twoDecimalCasesFixedValue = Number(value.toFixed(2));

    this.value = twoDecimalCasesFixedValue;
  }
}
