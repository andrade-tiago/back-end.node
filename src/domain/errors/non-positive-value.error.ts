export class NonPositiveValueError extends RangeError {
  public constructor(value: number) {
    super(`Invalid positive number "${value}"`);
  }
}
