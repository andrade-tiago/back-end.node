export class NonNumericValueError extends TypeError {
  public constructor(value: number) {
    super(`Value "${value}" is not numeric`);
  }
}
