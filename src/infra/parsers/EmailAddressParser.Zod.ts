import type { IEmailAddressParser } from "@/domain/parsers/IEmailAddressParser";
import { z } from "zod";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class EmailAddressParser implements IEmailAddressParser
{
  private schema: z.ZodSchema;

  public constructor()
  {
    this.schema = z.string().trim().email().toLowerCase()
  }

  public parse(value: string): string
  {
    try 
    {
      return this.schema.parse(value);
    }
    catch
    {
      throw new InvalidDataError(ErrorMessages.User.InvalidEmail(value));
    }
  }
}