import { User, type UserProps } from "./__User";
import { describe, it, expect } from "vitest";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";

class TestUser extends User {
  public static create(props: UserProps) {
    return new TestUser(props);
  }

  private constructor(props: UserProps) {
    super(props);
  }
}

describe('User Abstract Entity', () =>
{
  const validProps: UserProps =
  {
    id: mockUuid(),
    createdAt: mockNonFutureDatetime(),
  };

  it('should store id and createdAt correctly', () =>
  {
    const user = TestUser.create(validProps);

    expect(user.id).toBe(validProps.id);
    expect(user.createdAt).toBe(validProps.createdAt);
  });
});
