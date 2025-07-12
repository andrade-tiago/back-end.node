import { User, type UserProps } from "./__User";
import type { CPF } from "@/domain/value-objects/CPF";
import type { EmailAddress } from "@/domain/value-objects/EmailAddress";
import type { HashedPassword } from "@/domain/value-objects/HashedPassword";
import type { UserRoleEnum } from "@/domain/enums/UserRoleEnum";
import { FullName } from "@/domain/value-objects/FullName";

export class ActiveUser extends User {
  private _name: ActiveUserProps['name'];
  private _cpf: ActiveUserProps['cpf'];
  private _email: ActiveUserProps['email'];
  private _password: ActiveUserProps['password'];
  private _role: ActiveUserProps['role'];

  private constructor(props: ActiveUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt
    });
    this._name = props.name;
    this._cpf = props.cpf;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
  }

  public static create(props: ActiveUserProps): ActiveUser {
    return new ActiveUser(props);
  }

  public get name() { return this._name; }
  public get cpf() { return this._cpf; }
  public get email() { return this._email; }
  public get password() { return this._password; }
  public get role() { return this._role; }

  public set password(value: ActiveUserProps['password']) { this._password = value; }
}

export interface ActiveUserProps extends UserProps {
  name: FullName;
  cpf: CPF;
  email: EmailAddress;
  password: HashedPassword;
  role: UserRoleEnum;
}
