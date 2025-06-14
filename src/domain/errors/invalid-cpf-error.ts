export class InvalidCpfError extends Error {
  public constructor(value: string) {
    super(`Invalid CPF: "${value}"`);
  }
}
