import { ActiveUser, type User } from "@/domain/entities/User";

export const isUserActive = (user: User): user is ActiveUser => {
  return user instanceof ActiveUser;
};
