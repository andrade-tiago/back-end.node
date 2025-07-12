import { ActiveUser, type User } from "../entities/User";

export const isUserActive = (user: User): user is ActiveUser => {
  return user instanceof ActiveUser;
};
