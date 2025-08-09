import type { IPositiveIntParser } from "@/domain/parsers/IPositiveIntParser";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class PositiveIntParser implements IPositiveIntParser
{
  public parse(value: number): number
  {
    this.checkIfValueIsNumeric(value);
    this.checkIfValueIsInteger(value);
    this.checkIfValueIsPositive(value);

    return value;
  }

  private checkIfValueIsNumeric(value: number)
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
  private checkIfValueIsInteger(value: number)
  {
    if (!Number.isInteger(value))
    {
      throw new InvalidDataError(ErrorMessages.Number.NonInteger);
    }
  }
}
