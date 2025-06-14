import { Uuid } from "@/domain/shared/value-objects/uuid.vo";

export class UserDeletedError extends Error {
  public constructor(id: Uuid) {
    super(`User with id "${id.value}" was deleted`);
  }
}
