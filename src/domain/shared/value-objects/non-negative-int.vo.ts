import { NegativeValueError } from "@/domain/errors/negative-value-error";
import { NonNumericValueError } from "@/domain/errors/non-numeric-value-error";
import { NotIntegerValueError } from "@/domain/errors/not-integer-value-error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class NonNegativeInt {
  public readonly value: number;

  constructor(value: number) {
    if (!valueIsNumeric(value)) {
      throw new NonNumericValueError(value);
    }
    if (!Number.isInteger(value)) {
      throw new NotIntegerValueError(value);
    }
    if (value < 0) {
      throw new NegativeValueError(value);
    }

    this.value = value;
  }
}
