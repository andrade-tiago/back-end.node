import { INonNegativeIntParser } from "@/domain/parsers/non-negative-int.parser";

export class NonNegativeInt {
  public readonly value: number;

  constructor(
    validator: INonNegativeIntParser,
    value: NonNegativeInt['value'],
  ) {
    this.value = validator.parse(value);
  }
}
