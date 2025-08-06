import type { IPasswordParser } from "@/domain/parsers/IPasswordParser";
import { z } from "zod";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class PasswordParser implements IPasswordParser
{
  private _schema: z.ZodSchema;

  public constructor()
  {
    this._schema = z.string()
      .trim()
      .min(8)
      .max(24)

      // must contain at least:
      // - one lowercase letter
      // - one uppercase letter
      // - one number
      // - one especial character
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/);
  }

  public parse(value: string): string
  {
    try
    {
      return this._schema.parse(value);
    }
    catch
    {
      throw new InvalidDataError(ErrorMessages.User.InvalidPassword);
    }
  }
}
