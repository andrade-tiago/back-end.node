import type { IUserMapper } from "./IUserMapper";
import type { ActiveUser, DeletedUser } from "@/domain/entities/User";
import type { UserOutput } from "@/application/dtos/UserOutput";
import { beforeEach, describe, expect, expectTypeOf, test } from "vitest";
import { mockActiveUser } from "@/domain/entities/User/ActiveUser.mock";
import { mockDeletedUser } from "@/domain/entities/User/DeletedUser.mock";

type TestOptions = {
  getInstanceFunc: () => IUserMapper;
}

export function testUserMapper(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IUserMapper`, () =>
  {
    let factoryInstance: IUserMapper;

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    describe('should map the ActiveUsers correctly', () =>
    {
      const userInstances: ActiveUser[] = Array.from({ length: 5 }).map(mockActiveUser);

      test.each(userInstances)('input: %#', (user) =>
      {
        const result = factoryInstance.toOutput(user);

        expectTypeOf<typeof result>().toEqualTypeOf<UserOutput>();

        expect(result.id).toBe(user.id.value);
        expect(result.name).toBe(user.name.value);
        expect(result.cpf).toBe(user.cpf.value);
        expect(result.email).toBe(user.email.value);
        expect(result.createdAt).toBe(user.createdAt.value);
        expect(result.role).toBe(user.role);
        expect(result.deletedAt).toBe(null);
      });
    });

    describe('should map the DeletedUsers correctly', () =>
    {
      const userInstances: DeletedUser[] = Array.from({ length: 5 }).map(mockDeletedUser);

      test.each(userInstances)('input: %#', (user) =>
      {
        const result = factoryInstance.toOutput(user);

        expectTypeOf<typeof result>().toEqualTypeOf<UserOutput>();

        expect(result.id).toBe(user.id.value);
        expect(result.name).toBe(null);
        expect(result.cpf).toBe(null);
        expect(result.email).toBe(null);
        expect(result.createdAt).toBe(user.createdAt.value);
        expect(result.role).toBe(null);
        expect(result.deletedAt).toBe(user.deletedAt.value);
      });
    });
  });
}
