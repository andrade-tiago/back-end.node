import { describe, expect, it, vi, vitest } from "vitest";
import { ActiveUser, DeletedUser } from ".";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { makeFakeNonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo.fake";
import { makeFakeUuid } from "@/domain/shared/value-objects/uuid.vo.fake";
import { makeFakeUserName } from "./value-objects/user-name.vo.fake";
import { makeFakeCPF } from "./value-objects/cpf.vo.fake";
import { makeFakeEmail } from "./value-objects/email.vo.fake";
import { makeFakePassword } from "./value-objects/password.vo.fake";
import { makeFakeUserRole } from "./value-objects/user-role.vo.fake";

const now = new Date();
const randomNonFutureDate = makeFakeNonFutureDate();

const id = makeFakeUuid();
const name = makeFakeUserName();
const cpf = makeFakeCPF();
const email = makeFakeEmail();
const password = makeFakePassword();
const role = makeFakeUserRole();

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
