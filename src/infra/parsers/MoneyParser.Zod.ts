import type { IMoneyParser } from "@/domain/parsers/IMoneyParser";
import { z } from "zod";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class MoneyParser implements IMoneyParser
{
  private readonly schema: z.ZodSchema;

  public constructor()
  {
    this.schema = z.number()
      // verify if value is numeric
      .refine(
        value => Number.isFinite(value),
        ErrorMessages.Number.NonNumeric,
      )

      // round to two decimal places
      .transform(
        value => Math.round(value * 100) / 100
      )

      // verify if value is positive
      .refine(
        value => value > 0,
        ErrorMessages.Number.NonPositive,
      );
  }

  public parse(value: number): number
  {
    try
    {
      return this.schema.parse(value);
    }
    catch(error)
    {
      const errorMsg = error instanceof z.ZodError
        ? error.message
        : ErrorMessages.Number.NonNumeric;

      throw new InvalidDataError(errorMsg);
    }
  }
}