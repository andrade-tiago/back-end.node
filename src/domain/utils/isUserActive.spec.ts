import { describe, expect, expectTypeOf, it } from "vitest";
import { isUserActive } from "./isUserActive";
import { ActiveUser, User } from "../entities/User";
import { mockActiveUser } from "../entities/User/ActiveUser.mock";
import { mockDeletedUser } from "../entities/User/DeletedUser.mock";

describe('Function isUserActive', () =>
{
  it('should return true for ActiveUser', () =>
  {
    const activeUser: User = mockActiveUser();
    
    expect(isUserActive(activeUser)).toBe(true);
  });

  it('should return false for DeletedUser', () =>
  {
    const deletedUser: User = mockDeletedUser();

    expect(isUserActive(deletedUser)).toBe(false);
  });

  it('should reveal to intellisense that User type is actually ActiveUser', () => {
    const activeUser: User = mockActiveUser();

    if (!isUserActive(activeUser)) {
      // expectTypeOf<typeof activeUser>().toEqualTypeOf<ActiveUser>();
      throw new Error();
    }
    // if the function cannot reveal to intellisense that activeUser is ActiveUser,
    // this will reveal an error (uncomment the line inside the if above to see that)
    expectTypeOf<typeof activeUser>().toEqualTypeOf<ActiveUser>();
  });
});
