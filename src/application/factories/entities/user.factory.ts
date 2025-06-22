import { ActiveUser, DeletedUser, User } from "@/domain/entities/user";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { IUserRoleFactory } from "../value-objects/user-role.factory";

export type UserFactoryCreateProps = {
  id?: User['id'] | User['id']['value'];
  name: ActiveUser['name'] | ActiveUser['name']['value'];
  cpf: ActiveUser['cpf'] | ActiveUser['cpf']['value'];
  email: ActiveUser['email'] | ActiveUser['email']['value'];
  password: ActiveUser['password'] | ActiveUser['password']['value'];
  createdAt?: User['createdAt'] | Date | string | number;
  role?: ActiveUser['role'] | Parameters<IUserRoleFactory['create']>[0];
}

export type UserFactoryAnonymousProps = {
  id: User['id'] | User['id']['value'];
  createdAt: User['createdAt'] | Date | string | number;
  deletedAt?: NonFutureDate | Date | string | number;
}

export interface IUserFactory {
  createActive(props: UserFactoryCreateProps): Promise<ActiveUser>;
  createDeleted(props: UserFactoryAnonymousProps): DeletedUser;
}
