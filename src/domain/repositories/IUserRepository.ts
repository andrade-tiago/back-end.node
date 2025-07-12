import type { ActiveUser, User } from "@/domain/entities/User";
import type { PositiveInt } from "../value-objects/PositiveInt";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: ActiveUser['email']): Promise<ActiveUser | undefined>;
  containsUserWithId(id: User['id']): Promise<boolean>;
  containsUserWithEmail(email: ActiveUser['email']): Promise<boolean>;
  getById(id: User['id']): Promise<User | undefined>;
  getPaged(options: UserGetPagedOptions): Promise<Array<User>>;
  delete(id: User['id']): Promise<void>;
}

export type UserGetPagedOptions = {
  pageSize: PositiveInt;
  pageNumber: PositiveInt;
}
