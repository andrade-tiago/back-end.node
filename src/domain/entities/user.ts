import { CPF } from "@/domain/value-objects/cpf.vo";
import { Email } from "@/domain/value-objects/email.vo";
import { Password } from "@/domain/value-objects/password.vo";
import { UserName } from "@/domain/value-objects/user-name.vo";
import { Uuid } from "@/domain/value-objects/uuid.vo";

type UserProps = {
  id: Uuid;
  createdAt?: Date;
}
type ActiveUserProps = UserProps & {
  name: UserName;
  cpf: CPF;
  email: Email;
  password: Password;
}
type DeletedUserProps = UserProps & {
  deletedAt: Date;
}

export abstract class User {
  public readonly id: Uuid;
  public readonly createdAt: Date;

  public constructor(props: UserProps) {
    this.id = props.id;
    this.createdAt = props.createdAt ?? new Date();
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
  public readonly deletedAt: Date;

  public constructor(props: DeletedUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });

    this.deletedAt = props.deletedAt;
  }

  public static from({ id, createdAt }: ActiveUser): DeletedUser {
    const now = new Date();

    return new DeletedUser({ id, createdAt, deletedAt: now });
  }

  public isActive(): this is ActiveUser {
    return false;
  }
}
