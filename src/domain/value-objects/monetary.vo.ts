import { IMonetaryParser } from "@/domain/parsers/monetary.parser";

export class Monetary {
  public readonly value: number;

  public constructor(
    validator: IMonetaryParser,
    value: number,
  ) {
    this.value = validator.parse(value);
  }
}
