import { Uuid } from "@/domain/shared/value-objects/uuid.vo";

export class UserNotFoundError extends Error {
  public constructor(id: Uuid) {
    super(`User with email ${id.value} not found`);
  }
}
