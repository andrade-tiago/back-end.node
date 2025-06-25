import { ActiveUser, DeletedUser, User } from "../entities/user";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: ActiveUser['email']): Promise<ActiveUser | null>;
  containsUserWithId(id: User['id']): Promise<boolean>;
  containsUserWithEmail(email: ActiveUser['email']): Promise<boolean>;
  getById(id: User['id']): Promise<ActiveUser | DeletedUser | null>;
  getPaged(options: UserGetPagedOptions): Promise<Array<ActiveUser | DeletedUser>>;
  delete(id: User['id']): Promise<void>;
}

export type UserGetPagedOptions = {
  pageSize: number;
  pageNumber: number;
}
