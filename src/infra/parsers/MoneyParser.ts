import { ErrorMessages, InvalidDataError } from "@/domain/errors";
import { IMoneyParser } from "@/domain/parsers/IMoneyParser";

export class MoneyParser implements IMoneyParser
{
  public parse(value: number): number
  {
    this.checkIfValueIsNumeric(value);

    value = this.normalizeToTwoDecimalPlaces(value);

    // It needs to come after normalizing to two decimal places (see rounding tests)
    this.checkIfValueIsPositive(value);

    return value;
  }

  private normalizeToTwoDecimalPlaces(value: number): number
  {
    return Math.round(value * 100) / 100;
  }

  private checkIfValueIsNumeric(value: number): void
  {
    const valueIsNumeric = Number.isFinite(value);

    if (!valueIsNumeric)
    {
      throw new InvalidDataError(ErrorMessages.Number.NonNumeric);
    }
  }
  private checkIfValueIsPositive(value: number)
  {
    if (value <= 0)
    {
      throw new InvalidDataError(ErrorMessages.Number.NonPositive)
    }
  }
}
