import { ErrorMessages, InvalidDataError } from "@/domain/errors";
import { INonNegativeIntParser } from "@/domain/parsers/INonNegativeIntParser";
import { z } from "zod";

export class NonNegativeIntParser implements INonNegativeIntParser
{
  private readonly schema: z.ZodSchema;

  public constructor()
  {
    this.schema = z.number()
      .nonnegative(ErrorMessages.Number.Negative)
      .int(ErrorMessages.Number.NonInteger)
      // .refine(
      //   value => Number.isFinite(value),
      //   ErrorMessages.Number.NonNumeric,
      // )
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
        ? error.issues[0].message
        : ErrorMessages.Number.NonNumeric

      throw new InvalidDataError(errorMsg);
    }
  }
}