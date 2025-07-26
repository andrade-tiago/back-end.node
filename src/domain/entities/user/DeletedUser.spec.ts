import type { DeletedUserProps } from "./DeletedUser";
import { User } from "./__User";
import { DeletedUser } from "./DeletedUser";
import { ActiveUser } from "./ActiveUser";
import { describe, it, expect, vi } from "vitest";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { mockFullName } from "@/domain/value-objects/FullName.mock";
import { mockCPF } from "@/domain/value-objects/CPF.mock";
import { mockEmailAddress } from "@/domain/value-objects/EmailAddress.mock";
import { mockHashedPassword } from "@/domain/value-objects/HashedPassword.mock";
import { mockUserRole } from "@/domain/enums/UserRole.mock";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";
import { ConflictError } from "@/domain/errors";

describe('DeletedUser Entity', () =>
{
  const validProps: DeletedUserProps = {
    id: mockUuid(),
    createdAt: mockNonFutureDatetime(),
    deletedAt: NonFutureDatetime.now(),
  };

  it('should create a deleted user successfully', () =>
  {
    const user = DeletedUser.create(validProps);

    expect(user.id).toBe(validProps.id);
    expect(user.createdAt).toBe(validProps.createdAt);
    expect(user.deletedAt).toBe(validProps.deletedAt);
  });

  it('should be an instance of User', () =>
  {
    const user = DeletedUser.create(validProps);

    expect(user).toBeInstanceOf(User);
  });

  it('should create a deleted user from an active user', () =>
  {
    const activeUser = ActiveUser.create({
      id: mockUuid(),
      createdAt: mockNonFutureDatetime(),
      name: mockFullName(),
      cpf: mockCPF(),
      email: mockEmailAddress(),
      password: mockHashedPassword(),
      role: mockUserRole(),
    });

    const now = mockNonFutureDatetime();
    const spy = vi.spyOn(NonFutureDatetime, 'now').mockReturnValue(now);

    const deletedUser = DeletedUser.fromActiveUser(activeUser);

    expect(deletedUser.id).toBe(activeUser.id);
    expect(deletedUser.createdAt).toBe(activeUser.createdAt);
    expect(deletedUser.deletedAt).toBe(now);

    spy.mockRestore();
  });

  it('should throw if deletion datetime is earlier than creation datetime', () =>
  {
    expect(() =>
    {
      DeletedUser.create({
        id: validProps.id,
        createdAt: NonFutureDatetime.now(),
        deletedAt: mockNonFutureDatetime(),
      });
    }).toThrow(ConflictError);
  });
});
