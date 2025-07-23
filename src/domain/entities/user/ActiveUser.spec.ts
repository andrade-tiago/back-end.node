import type { ActiveUserProps } from "./ActiveUser";
import { User } from "./__User";
import { ActiveUser } from "./ActiveUser";
import { describe, it, expect } from "vitest";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";
import { mockNonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime.mock";
import { mockFullName } from "@/domain/value-objects/FullName.mock";
import { mockCPF } from "@/domain/value-objects/CPF.mock";
import { mockEmailAddress } from "@/domain/value-objects/EmailAddress.mock";
import { mockHashedPassword } from "@/domain/value-objects/HashedPassword.mock";
import { mockUserRole } from "@/domain/enums/UserRole.mock";

describe('ActiveUser Entity', () =>
{
  const validProps: ActiveUserProps =
  {
    id: mockUuid(),
    createdAt: mockNonFutureDatetime(),
    name: mockFullName(),
    cpf: mockCPF(),
    email: mockEmailAddress(),
    password: mockHashedPassword(),
    role: mockUserRole(),
  };

  it('should create an active user successfully', () =>
  {
    const user = ActiveUser.create(validProps);

    expect(user.id).toBe(validProps.id);
    expect(user.createdAt).toBe(validProps.createdAt);
    expect(user.name).toBe(validProps.name);
    expect(user.cpf).toBe(validProps.cpf);
    expect(user.email).toBe(validProps.email);
    expect(user.password).toBe(validProps.password);
    expect(user.role).toBe(validProps.role);
  });

  it('should allow you to change the password successfully', () =>
  {
    const user = ActiveUser.create(validProps);
    const newPassword = mockHashedPassword();

    user.password = newPassword;

    expect(user.password).toBe(newPassword);
  });
  
  it('should be an instance of User', () =>
  {
    const user = ActiveUser.create(validProps);

    expect(user).toBeInstanceOf(User);
  });
});
