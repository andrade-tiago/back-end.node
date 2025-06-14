export class NegativeValueError extends RangeError {
  public constructor(value: number) {
    super(`Value ${value} cannot be negative`);
  }
}
