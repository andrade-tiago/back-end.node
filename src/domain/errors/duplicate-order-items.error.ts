export class DuplicateOrderItemsError extends Error {
  public constructor() {
    super(`An order cannot contain duplicate items`);
  }
}
