import { DeletedUser, type User } from "@/domain/entities/User";

export const isUserDeleted = (user: User): user is DeletedUser => {
  return user instanceof DeletedUser;
};
