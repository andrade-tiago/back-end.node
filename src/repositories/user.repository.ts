import { Email } from "@/shared/value-objects/email.vo";
import { ActiveUser, DeletedUser, User } from "../entities/user";
import { Uuid } from "@/shared/value-objects/uuid.vo";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: Email): Promise<ActiveUser | null>;
  containsUserWithEmail(email: Email): Promise<boolean>;
  getById(id: Uuid): Promise<ActiveUser | DeletedUser | null>;
  getPaged(options: UserGetPagedOptions): Promise<Array<ActiveUser | DeletedUser>>;
  delete(id: Uuid): Promise<void>;
}

export type UserGetPagedOptions = {
  pageSize: number;
  pageNumber: number;
}
