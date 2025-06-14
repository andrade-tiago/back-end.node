export class FutureDateError extends RangeError {
  public constructor(value: Date) {
    super(`Date cannot be in the future: ${value.toISOString()}`)
  }
}
