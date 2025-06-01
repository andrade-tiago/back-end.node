import { Uuid } from "@/domain/value-objects/uuid.vo";
import { UserName } from "@/domain/value-objects/user-name.vo";
import { CPF } from "@/domain/value-objects/cpf.vo";
import { Email } from "@/domain/value-objects/email.vo";
import { Password } from "@/domain/value-objects/password.vo";
import { ActiveUser, DeletedUser } from "@/domain/entities/user";

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
