import { UserRole, UserRoleEnum } from "./user-role.vo";

export const makeFakeUserRole = (): UserRole => {
  const userRoles = Object.values(UserRoleEnum);

  const selectRandomArrayItem = <T>(arr: Array<T>) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return new UserRole(selectRandomArrayItem(userRoles));
};
