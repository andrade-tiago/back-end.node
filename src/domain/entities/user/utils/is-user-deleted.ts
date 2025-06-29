import { DeletedUser, User } from "..";

export const isUserDeleted = (user: User): user is DeletedUser => {
  return user instanceof DeletedUser;
};
