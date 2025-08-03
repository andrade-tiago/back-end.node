import { beforeEach, describe, expect, it } from "vitest";
import { IUserFactory } from "./IUserFactory";
import { ActiveUser, DeletedUser } from "../entities/User";
import { mockActiveUser } from "../entities/User/ActiveUser.mock";
import { mockDeletedUser } from "../entities/User/DeletedUser.mock";

type TestOptions = {
  getInstanceFunc: () => IUserFactory;
}

export function testUserFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IUserFactory`, () =>
  {
    let factoryInstance: IUserFactory;

    const fakeActiveUser: ActiveUser = mockActiveUser();
    const fakeDeletedUser: DeletedUser = mockDeletedUser();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from a ActiveUser instance successfully', async () =>
    {
      const testInstance = factoryInstance.createActive(fakeActiveUser);

      expect(testInstance).toBeInstanceOf(ActiveUser);
      expect(testInstance.value).toBe(fakeActiveUser.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeActiveUser.value);

      expect(testInstance).toBeInstanceOf(Uuid);
      expect(testInstance.value).toBe(fakeActiveUser.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);
    });

    it('should call Uuid.create internally', () =>
    {
      const spy = vi.spyOn(Uuid, 'create').mockReturnValue(fakeDeletedUser);
      const result = factoryInstance.create(fakeActiveUser);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeActiveUser);
      expect(result.value).toBe(fakeDeletedUser.value);

      spy.mockRestore();
    });
  });
}
