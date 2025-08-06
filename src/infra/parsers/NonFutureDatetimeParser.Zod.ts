import type { INonFutureDatetimeParser } from "@/domain/parsers/INonFutureDatetimeParser";
import { z } from "zod";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class NonFutureDatetimeParser implements INonFutureDatetimeParser
{
  private readonly schema: z.ZodSchema;

  public constructor()
  {
    const now = new Date();

    this.schema = z.coerce.date()
      .max(now, ErrorMessages.Date.FutureDate)
      .transform(
        value => value.toISOString()
      );
  }

  public parse(value: string | number | Date): string
  {
    try
    {
      return this.schema.parse(value);
    }
    catch(error)
    {
      const errorMsg = error instanceof z.ZodError
        ? error.issues[0].message
        : ErrorMessages.Date.InvalidDate;
      
      throw new InvalidDataError(errorMsg);
    }
  } 
}