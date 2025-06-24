import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InternalError } from "@/domain/errors/internal-error.error";

export class Password {
  // Bcrypt hash string
  private static encryptedStringRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

  public readonly value: string;

  public constructor(hashedPasswordStr: string) {
    hashedPasswordStr = hashedPasswordStr.trim();

    if (Password.encryptedStringRegex.test(hashedPasswordStr)) {
      throw new InternalError(DomainErrorMessages.NonEncryptedString(hashedPasswordStr));
    }

    this.value = hashedPasswordStr;
  }
}
