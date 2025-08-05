import type { IHashedPasswordParser } from "@/domain/parsers/IHashedPasswordParser";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class HashedPasswordParser implements IHashedPasswordParser
{
  private readonly regex: RegExp;

  public constructor()
  {
    this.regex =
      // Bcrypt hash regex
      /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/;
  }

  public parse(value: string): string
  {
    const trimmedValue = value.trim();

    if (this.regex.test(trimmedValue))
    {
      return trimmedValue;
    }
    throw new InvalidDataError(ErrorMessages.NonEncryptedString(value));
  }
}
