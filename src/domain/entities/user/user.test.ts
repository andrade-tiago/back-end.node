import { describe, expect, it, vi, vitest } from "vitest";
import { ActiveUser, DeletedUser } from ".";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserName } from "./value-objects/user-name.vo";
import { CPF } from "./value-objects/cpf.vo";
import { Email } from "./value-objects/email.vo";
import { Password } from "./value-objects/password.vo";
import { UserRole, UserRoleEnum } from "./value-objects/user-role.vo";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

const now = new Date();
const randomNonFutureDate = new NonFutureDate('2025-06-29T17:31:24.808Z');

const id = new Uuid('c6288df3-ad11-45a3-94b4-5d0697fa5e26');
const name = new UserName('Foo Bar');
const cpf = new CPF('532.571.030-34');
const email = new Email('foo@bar.com');
const password = new Password('$2a$12$qd/DLBe/pel.NHVtbWjsSO5ucbCoVlbR8mAqUlQ48EkiVCGoOg3m2');
const role = new UserRole(UserRoleEnum.User);

describe('ActiveUser Entity', () => {
  it('should be created with accessible and correct values', () => {
    vitest.useFakeTimers();
    vitest.setSystemTime(now);

    {
      const activeUser1 = new ActiveUser({ id, name, cpf, email, password, role });
  
      expect(activeUser1.id.value).toBe(id.value);
      expect(activeUser1.name.value).toBe(name.value);
      expect(activeUser1.cpf.value).toBe(cpf.value);
      expect(activeUser1.email.value).toBe(email.value);
      expect(activeUser1.password.value).toBe(password.value);
      expect(activeUser1.role.value).toBe(role.value);

      expect(activeUser1.createdAt.toDate().getTime())
        .toBe(now.getTime());
    }

    {
      const activeUser2 = new ActiveUser({
        id, name, cpf, email, password, role, createdAt: randomNonFutureDate,
      });

      expect(activeUser2.createdAt.toDate().getTime())
        .toBe(randomNonFutureDate.toDate().getTime());
    }

    vitest.useRealTimers();
  });
});

describe('DeletedUser Entity', () => {
  it('should be created with accessible and correct values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(now);

    {
      const deletedUser1 = new DeletedUser({ id, createdAt: randomNonFutureDate });
  
      expect(deletedUser1.id.value).toBe(id.value);
  
      expect(deletedUser1.createdAt.toDate().getTime())
        .toBe(randomNonFutureDate.toDate().getTime());
  
      expect(deletedUser1.deletedAt.toDate().getTime())
        .toBe(now.getTime());
    }
    {
      const deletedUser2 = new DeletedUser({ id, createdAt: randomNonFutureDate, deletedAt: randomNonFutureDate });

      expect(deletedUser2.deletedAt.toDate().getTime())
        .toBe(randomNonFutureDate.toDate().getTime());
    }
    {
      const activeUser = new ActiveUser({
        id, name, cpf, email, password, role, createdAt: randomNonFutureDate,
      });

      const deletedUser3 = DeletedUser.from(activeUser);

      expect(deletedUser3.id.value).toBe(id.value);

      expect(deletedUser3.createdAt.toDate().getTime())
        .toBe(randomNonFutureDate.toDate().getTime());

      expect(deletedUser3.deletedAt.toDate().getTime())
        .toBe(now.getTime());
    }

    vi.useRealTimers();
  });

  it('should thrown an error if deletion datetime to be earlier than creation datetime', () => {
    expect(() => new DeletedUser({ id, createdAt: new NonFutureDate(), deletedAt: randomNonFutureDate }))
      .toThrow();
  });
});
