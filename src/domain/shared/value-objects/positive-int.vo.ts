import { NonNumericValueError } from "@/domain/errors/non-numeric-value-error";
import { NonPositiveValueError } from "@/domain/errors/non-positive-value.error";
import { NotIntegerValueError } from "@/domain/errors/not-integer-value-error";
import { valueIsNumeric } from "@/shared/utils/value-is-numeric";

export class PositiveInt {
  public readonly value: number;

  public constructor(value: number) {
    if (!valueIsNumeric(value)) {
      throw new NonNumericValueError(value);
    }
    if (!Number.isInteger(value)) {
      throw new NotIntegerValueError(value);
    }
    if (value <= 0) {
      throw new NonPositiveValueError(value);
    }

    this.value = value;
  }
}
