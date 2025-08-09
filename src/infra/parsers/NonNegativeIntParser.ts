import { ErrorMessages, InvalidDataError } from "@/domain/errors";
import { INonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser";

export class NonNegativeIntParser implements INonNegativeIntParser
{
  public parse(value: number): number
  {
    this.checkIfValueIsNumeric(value);
    this.checkIfValueIsInteger(value);
    this.checkIfValueIsNonNegative(value);

    return value;  
  }

  private checkIfValueIsNumeric(value: number): void
  {
    const valueIsNumeric = Number.isFinite(value);

    if (!valueIsNumeric)
    {
      throw new InvalidDataError(ErrorMessages.Number.NonNumeric);
    }
  }
  private checkIfValueIsInteger(value: number): void
  {
    if (!Number.isInteger(value))
    {
      throw new InvalidDataError(ErrorMessages.Number.NonInteger);
    }
  }
  private checkIfValueIsNonNegative(value: number): void
  {
    if (value < 0)
    {
      throw new InvalidDataError(ErrorMessages.Number.Negative);
    }
  }
}
