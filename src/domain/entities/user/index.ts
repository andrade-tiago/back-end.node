import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserName } from "./value-objects/user-name.vo";
import { CPF } from "./value-objects/cpf.vo";
import { Email } from "./value-objects/email.vo";
import { Password } from "./value-objects/password.vo";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";

type UserProps = {
  id: Uuid;
  createdAt?: NonFutureDate;
}
type ActiveUserProps = UserProps & {
  name: UserName;
  cpf: CPF;
  email: Email;
  password: Password;
}
type DeletedUserProps = UserProps & {
  deletedAt: NonFutureDate;
}

export abstract class User {
  public readonly id: Uuid;
  public readonly createdAt: NonFutureDate;

  public constructor(props: UserProps) {
    this.id = props.id;
    this.createdAt = props.createdAt ?? NonFutureDate.now();
  }

  public abstract isActive(): this is ActiveUser;
}

export class ActiveUser extends User {
  public readonly name: UserName;
  public readonly cpf: CPF;
  public readonly email: Email;
  public readonly password: Password;

  public constructor(props: ActiveUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });

    this.name = props.name;
    this.cpf = props.cpf;
    this.email = props.email;
    this.password = props.password;
  }

  public isActive(): this is ActiveUser {
    return true;
  }
}

export class DeletedUser extends User {
  public readonly deletedAt: NonFutureDate;

  public constructor(props: DeletedUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });

    this.deletedAt = props.deletedAt;
  }

  public static from({ id, createdAt }: ActiveUser): DeletedUser {
    const now = NonFutureDate.now();

    return new DeletedUser({ id, createdAt, deletedAt: now });
  }

  public isActive(): this is ActiveUser {
    return false;
  }
}
