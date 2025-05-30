import { Uuid } from "@/shared/value-objects/uuid.vo";
import { ActiveUser, DeletedUser } from "./user";
import { UserName } from "@/shared/value-objects/user-name.vo";
import { CPF } from "@/shared/value-objects/cpf.vo";
import { Email } from "@/shared/value-objects/email.vo";
import { Password } from "@/shared/value-objects/password.vo";

type UserFactoryCreateProps = {
  id?: Uuid | Uuid['value'];
  name: UserName | UserName['value'];
  cpf: CPF | CPF['value'];
  email: Email | Email['value'];
  password: Password | Password['value'];
  createdAt?: Date | string | number;
}

type UserFactoryAnonymousProps = {
  id: Uuid | Uuid['value'];
  createdAt: Date | string | number;
  deletedAt: Date | string | number;
}

export interface IUserFactory {
  createActive(props: UserFactoryCreateProps): Promise<ActiveUser>;
  createDeleted(props: UserFactoryAnonymousProps): Promise<DeletedUser>;
}
