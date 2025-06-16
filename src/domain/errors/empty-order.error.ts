export class EmptyOrderError extends Error {
  public constructor() {
    super(`An order must have at least one item`);
  }
}
