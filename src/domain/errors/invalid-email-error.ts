export class InvalidEmailError extends Error {
  public constructor(value: string) {
    super(`Invalid e-mail: "${value}"`);
  }
}
