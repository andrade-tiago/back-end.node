import { ActiveUser, DeletedUser, UserRole } from "@/domain/entities/user";
import { CPF } from "@/domain/entities/user/value-objects/cpf.vo";
import { Email } from "@/domain/entities/user/value-objects/email.vo";
import { Password } from "@/domain/entities/user/value-objects/password.vo";
import { UserName } from "@/domain/entities/user/value-objects/user-name.vo";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";

type UserFactoryCreateProps = {
  id?: Uuid | Uuid['value'];
  name: UserName | UserName['value'];
  cpf: CPF | CPF['value'];
  email: Email | Email['value'];
  password: Password | Password['value'];
  createdAt?: NonFutureDate | Date | string | number;
  role?: UserRole | string;
}

type UserFactoryAnonymousProps = {
  id: Uuid | Uuid['value'];
  createdAt: Date | string | number;
  deletedAt?: NonFutureDate | Date | string | number;
}

export interface IUserFactory {
  createActive(props: UserFactoryCreateProps): Promise<ActiveUser>;
  createDeleted(props: UserFactoryAnonymousProps): Promise<DeletedUser>;
}
