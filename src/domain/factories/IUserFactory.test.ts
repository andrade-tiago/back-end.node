import type { IUserFactory } from "./IUserFactory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockActiveUser } from "@/domain/entities/User/ActiveUser.mock";
import { mockDeletedUser } from "@/domain/entities/User/DeletedUser.mock";
import { Uuid } from "@/domain/value-objects/Uuid";
import { UserRoleEnum } from "@/domain/enums/UserRoleEnum";

type TestOptions = {
  getInstanceFunc: () => IUserFactory;
}

export function testUserFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IUserFactory`, () =>
  {
    let factoryInstance: IUserFactory;

    const fakeActiveUser = mockActiveUser();
    const fakeDeletedUser = mockDeletedUser();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    describe('should create an ActiveUser with correct values', () =>
    {
      it('from Value Objects', () =>
      {
        const result = factoryInstance.createActive(
        {
          id: fakeActiveUser.id,
          name: fakeActiveUser.name,
          cpf: fakeActiveUser.cpf,
          email: fakeActiveUser.email,
          password: fakeActiveUser.password,
          createdAt: fakeActiveUser.createdAt,
          role: fakeActiveUser.role,
        });

        expect(result.id.value).toBe(fakeActiveUser.id.value);
        expect(result.name.value).toBe(fakeActiveUser.name.value);
        expect(result.cpf.value).toBe(fakeActiveUser.cpf.value);
        expect(result.email.value).toBe(fakeActiveUser.email.value);
        expect(result.password.value).toBe(fakeActiveUser.password.value);
        expect(result.role).toBe(fakeActiveUser.role);
        expect(result.createdAt.value).toBe(fakeActiveUser.createdAt.value);
      });

      it('from pure values', () =>
      {
        const result = factoryInstance.createActive(
        {
          id: fakeActiveUser.id.value,
          name: fakeActiveUser.name.value,
          cpf: fakeActiveUser.cpf.value,
          email: fakeActiveUser.email.value,
          createdAt: fakeActiveUser.createdAt.toDate(),
          role: fakeActiveUser.role as string,

          password: fakeActiveUser.password,
        });

        expect(result.id.value).toBe(fakeActiveUser.id.value);
        expect(result.name.value).toBe(fakeActiveUser.name.value);
        expect(result.cpf.value).toBe(fakeActiveUser.cpf.value);
        expect(result.email.value).toBe(fakeActiveUser.email.value);
        expect(result.createdAt.value).toBe(fakeActiveUser.createdAt.value);
      });

      it('for optional value', () =>
      {
        const now = new Date();
        vi.useFakeTimers();
        vi.setSystemTime(now);

        const result = factoryInstance.createActive(
        {
          cpf: fakeActiveUser.cpf,
          name: fakeActiveUser.name,
          email: fakeActiveUser.email,
          password: fakeActiveUser.password,
        });

        expect(result.id).toBeInstanceOf(Uuid);
        expect(result.role).toBe(UserRoleEnum.User);
        expect(result.createdAt.toDate().valueOf())
          .toBe(now.valueOf());

        vi.useRealTimers();
      });
    });

    describe('should create a DeletedUser with correct values', () =>
    {
      it('from Value Objects', () =>
      {
        const result = factoryInstance.createDeleted(
        {
          id: fakeDeletedUser.id,
          createdAt: fakeDeletedUser.createdAt,
          deletedAt: fakeDeletedUser.deletedAt,
        });

        expect(result.id.value).toBe(fakeDeletedUser.id.value);
        expect(result.createdAt.value).toBe(fakeDeletedUser.createdAt.value);
        expect(result.deletedAt.value).toBe(fakeDeletedUser.deletedAt.value);
      });

      it('from pure values', () =>
      {
        const result = factoryInstance.createDeleted(
        {
          id: fakeDeletedUser.id.value,
          createdAt: fakeDeletedUser.createdAt.toDate(),
          deletedAt: fakeDeletedUser.deletedAt.toDate(),
        });

        expect(result.id.value).toBe(fakeDeletedUser.id.value);
        expect(result.createdAt.value).toBe(fakeDeletedUser.createdAt.value);
        expect(result.deletedAt.value).toBe(fakeDeletedUser.deletedAt.value);
      });

      it('for optional values', () =>
      {
        const now = new Date();
        vi.useFakeTimers();
        vi.setSystemTime(now);

        const result = factoryInstance.createDeleted(
        {
          id: fakeDeletedUser.id,
          createdAt: fakeDeletedUser.createdAt,
        });

        expect(
          result.deletedAt.toDate().valueOf()
        ).toBe(
          now.valueOf()
        );

        vi.useRealTimers();
      });
    });
  });
}
