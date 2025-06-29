import { describe, expect, it } from "vitest";
import { ActiveUser, DeletedUser } from "..";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { isUserDeleted } from "./is-user-deleted";
import { UserName } from "../value-objects/user-name.vo";
import { CPF } from "../value-objects/cpf.vo";
import { Email } from "../value-objects/email.vo";
import { Password } from "../value-objects/password.vo";
import { UserRole, UserRoleEnum } from "../value-objects/user-role.vo";

describe('Function isUserDeleted', () => {
  it('should return true if user is a DeletedUser instance', () => {
    const deletedUserInstance = new DeletedUser({
      id: new Uuid('970e1881-7d4b-4aec-9691-8f5c2db2c14e'),
      createdAt: new NonFutureDate(),
    });

    expect(isUserDeleted(deletedUserInstance)).toBe(true);
  });

  it('should return false if user is not a DeletedUser instance', () => {
    const activeUserInstance = new ActiveUser({
      id: new Uuid('970e1881-7d4b-4aec-9691-8f5c2db2c14e'),
      name: new UserName('Foo Bar'),
      cpf: new CPF('394.214.320-88'),
      email: new Email('foo@bar.com'),
      password: new Password('$2a$12$Ev2boZ1fPn9RtGLSg3jwdu2oKiBdP/HvVe6RAOp2GyoSsEcv1jKym'),
      role: new UserRole(UserRoleEnum.User),
    });

    expect(isUserDeleted(activeUserInstance)).toBe(false);
  });
});
