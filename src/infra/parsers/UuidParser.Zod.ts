import type { IUuidParser } from "@/domain/parsers/IUuidParser";
import { z } from "zod";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class UuidParser implements IUuidParser
{
  private schema: z.ZodSchema;

  public constructor()
  {
    this.schema = z.string().trim().uuid().toLowerCase();
  }

  public parse(value: string): string
  {
    try
    {
      return this.schema.parse(value);
    }
    catch
    {
      throw new InvalidDataError(ErrorMessages.InvalidUuid(value));
    }
  }
}
