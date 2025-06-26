import { describe, expect, it } from "vitest";
import { UserRole, UserRoleEnum } from "./user-role.vo";

describe('UserRole VO', () => {
  it('should be created successfully', () => {
    expect(new UserRole('user').value).toBe(UserRoleEnum.User);
    expect(new UserRole('user').value).toBe('user');
    expect(new UserRole(UserRoleEnum.User).value).toBe('user');
    expect(new UserRole(UserRoleEnum.User).value).toBe(UserRoleEnum.User);

    expect(new UserRole('admin').value).toBe(UserRoleEnum.Admin);
  });

  it('should throw an error if value to be an invalid string', () => {
    const invalidUserRoles = [
      '',
      'foo',
      'User',
      'USER',
      'adm',
    ];

    invalidUserRoles.forEach(str => {
      expect(() => new UserRole(str)).toThrow();
    });
  });
});
