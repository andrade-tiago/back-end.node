import { NonEncryptedStringError } from "@/domain/errors/non-encrypted-string-error";

export class Password {
  // Bcrypt hash string
  private static encryptedStringRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

  public readonly value: string;

  private constructor(hashedPasswordStr: string) {
    hashedPasswordStr = hashedPasswordStr.trim();

    if (Password.encryptedStringRegex.test(hashedPasswordStr)) {
      throw new NonEncryptedStringError(hashedPasswordStr);
    }

    this.value = hashedPasswordStr;
  }
}
