import { describe, expect, expectTypeOf, it } from "vitest";
import { isUserActive } from "./isUserActive";
import { ActiveUser, DeletedUser, User } from "../entities/User";
import { mockActiveUser } from "../entities/User/ActiveUser.mock";
import { mockDeletedUser } from "../entities/User/DeletedUser.mock";
import { isUserDeleted } from "./isUserDeleted";

describe('Function isUserDeleted', () =>
{
  it('should return true for DeletedUser', () =>
  {
    const deletedUser: User = mockDeletedUser();
    
    expect(isUserDeleted(deletedUser)).toBe(true);
  });

  it('should return false for ActiveUser', () =>
  {
    const activeUser: User = mockActiveUser();

    expect(isUserDeleted(activeUser)).toBe(false);
  });

  it('should reveal to intellisense that User type is actually DeletedUser', () => {
    const deletedUser: User = mockDeletedUser();

    if (!isUserDeleted(deletedUser)) {
      // expectTypeOf<typeof deletedUser>().toEqualTypeOf<DeletedUser>();
      throw new Error();
    }
    // if the function cannot reveal to intellisense that deletedUser is DeletedUser,
    // this will reveal an error (uncomment the line inside the if above to see that)
    expectTypeOf<typeof deletedUser>().toEqualTypeOf<DeletedUser>();
  });
});
