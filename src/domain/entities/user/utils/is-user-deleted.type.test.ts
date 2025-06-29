import { describe, expectTypeOf, it } from "vitest";
import { DeletedUser, User } from "..";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { isUserDeleted } from "./is-user-deleted";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";

describe('Function isUserDeleted', () => {
  it('should reveal to TypeScript that type of user is DeletedUser', () => {
    const deletedUserInstance: User = new DeletedUser({
      id: new Uuid('970e1881-7d4b-4aec-9691-8f5c2db2c14e'),
      createdAt: new NonFutureDate(),
    });

    if (isUserDeleted(deletedUserInstance)) {
      expectTypeOf(deletedUserInstance).toEqualTypeOf<DeletedUser>();
    }
  });
});
