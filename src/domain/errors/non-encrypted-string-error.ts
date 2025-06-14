export class NonEncryptedStringError extends TypeError {
  public constructor(value: string) {
    super(`Invalid encrypted string "${value}"`);
  }
}
