import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserName } from "./value-objects/user-name.vo";
import { CPF } from "./value-objects/cpf.vo";
import { Email } from "./value-objects/email.vo";
import { Password } from "./value-objects/password.vo";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { UserRole } from "./value-objects/user-role.vo";
import { ConflictError } from "@/application/errors/conflict.error";
import { DomainErrorMessages } from "@/domain/errors/_error-messages";

type UserProps = {
  id: Uuid;
  createdAt?: NonFutureDate;
}
type ActiveUserProps = UserProps & {
  name: UserName;
  cpf: CPF;
  email: Email;
  password: Password;
  role: UserRole;
}
type DeletedUserProps = UserProps & {
  deletedAt?: NonFutureDate;
}

export abstract class User {
  public readonly id: Uuid;
  public readonly createdAt: NonFutureDate;

  public constructor(props: UserProps) {
    this.id = props.id;
    this.createdAt = props.createdAt ?? new NonFutureDate();
  }
}

export class ActiveUser extends User {
  public readonly name: UserName;
  public readonly cpf: CPF;
  public readonly email: Email;
  public readonly password: Password;
  public readonly role: UserRole;

  public constructor(props: ActiveUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });

    this.name = props.name;
    this.cpf = props.cpf;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }
}

export class DeletedUser extends User {
  public readonly deletedAt: NonFutureDate;

  public constructor(props: DeletedUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });

    if (props.deletedAt) {
      if (props.deletedAt.toDate() < this.createdAt.toDate()) {
        throw new ConflictError(DomainErrorMessages.Date.DeletionEarlierThanCreation);
      }
      this.deletedAt = props.deletedAt;
    } else {
      this.deletedAt = new NonFutureDate();
    }
  }

  public static from({ id, createdAt }: ActiveUser): DeletedUser {
    return new DeletedUser({ id, createdAt });
  }
}
