import { ActiveUser, User } from "..";

export const isUserActive = (user: User): user is ActiveUser => {
  return user instanceof ActiveUser;
};
