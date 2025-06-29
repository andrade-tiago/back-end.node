import { assertType, describe, expectTypeOf, it } from "vitest";
import { ActiveUser, User } from "..";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserName } from "../value-objects/user-name.vo";
import { CPF } from "../value-objects/cpf.vo";
import { Email } from "../value-objects/email.vo";
import { Password } from "../value-objects/password.vo";
import { UserRole, UserRoleEnum } from "../value-objects/user-role.vo";
import { isUserActive } from "./is-user-active";

describe('Function isUserActive', () => {
  it('should reveal to TypeScript that type of user is ActiveUser', () => {
    const activeUserInstance: User = new ActiveUser({
      id: new Uuid('970e1881-7d4b-4aec-9691-8f5c2db2c14e'),
      name: new UserName('Foo Bar'),
      cpf: new CPF('394.214.320-88'),
      email: new Email('foo@bar.com'),
      password: new Password('$2a$12$Ev2boZ1fPn9RtGLSg3jwdu2oKiBdP/HvVe6RAOp2GyoSsEcv1jKym'),
      role: new UserRole(UserRoleEnum.User),
    });
    
    if (isUserActive(activeUserInstance)) {
      expectTypeOf(activeUserInstance).toEqualTypeOf<ActiveUser>();
    }
  });
});
