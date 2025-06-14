export class InvalidUuidError extends TypeError {
  public constructor(value: string) {
    super(`Invalid id "${value}"`);
  }
}
