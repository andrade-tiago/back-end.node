export class NotIntegerValueError extends RangeError {
  public constructor(value: number) {
    super(`Value "${value}" must be an integer`);
  }
}
