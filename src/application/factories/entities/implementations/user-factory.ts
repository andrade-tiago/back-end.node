import { ActiveUser, DeletedUser } from "@/domain/entities/user";
import { IUserFactory, UserFactoryAnonymousProps, UserFactoryCreateProps } from "../user.factory";
import { IUuidFactory } from "../../value-objects/uuid.factory";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserName } from "@/domain/entities/user/value-objects/user-name.vo";
import { IUserNameFactory } from "../../value-objects/user-name.factory";
import { Email } from "@/domain/entities/user/value-objects/email.vo";
import { IEmailFactory } from "../../value-objects/email.factory";
import { CPF } from "@/domain/entities/user/value-objects/cpf.vo";
import { ICpfFactory } from "../../value-objects/cpf.factory";
import { IPasswordFactory } from "../../value-objects/password.factory";
import { NonFutureDate } from "@/domain/shared/value-objects/non-future-date.vo";
import { INonFutureDateFactory } from "../../value-objects/non-future-date.factory";
import { UserRole, UserRoleEnum } from "@/domain/entities/user/value-objects/user-role.vo";
import { IUserRoleFactory } from "../../value-objects/user-role.factory";
import { Password } from "@/domain/entities/user/value-objects/password.vo";

export class UserFactory implements IUserFactory {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userNameFactory: IUserNameFactory,
    private readonly _cpfFactory: ICpfFactory,
    private readonly _emailFactory: IEmailFactory,
    private readonly _passwordFactory: IPasswordFactory,
    private readonly _nonFutureDateFactory: INonFutureDateFactory,
    private readonly _userRoleFactory: IUserRoleFactory,
  ) {}

  public async createActive(props: UserFactoryCreateProps): Promise<ActiveUser> {
    return new ActiveUser({
      id: this.resolveId(props.id),
      name: this.resolveName(props.name),
      cpf: this.resolveCpf(props.cpf),
      email: this.resolveEmail(props.email),
      password: await this.resolvePassword(props.password),
      createdAt: this.resolveCreatedAt(props.createdAt),
      role: this.resolveRole(props.role),
    });
  }
  public createDeleted(props: UserFactoryAnonymousProps): DeletedUser {
    return new DeletedUser({
      id: this.resolveId(props.id),
      createdAt: this.resolveCreatedAt(props.createdAt),
      deletedAt: this.resolveDeletedAt(props.deletedAt),
    });
  }

  private resolveId(id: UserFactoryCreateProps['id']): Uuid {
    if (id instanceof Uuid) {
      return id;
    }
    if (!id) {
      return this._uuidFactory.generate();
    }
    return this._uuidFactory.createFromString(id);
  }
  private resolveName(name: UserFactoryCreateProps['name']): UserName {
    return name instanceof UserName ? name : this._userNameFactory.create(name);
  }
  private resolveCpf(cpf: UserFactoryCreateProps['cpf']): CPF {
    return cpf instanceof CPF ? cpf : this._cpfFactory.create(cpf);
  }
  private resolveEmail(email: UserFactoryCreateProps['email']): Email {
    return email instanceof Email ? email : this._emailFactory.create(email);
  }
  private async resolvePassword(password: UserFactoryCreateProps['password']): Promise<Password> {
    if (password instanceof Password) {
      return password;
    }

    try {
      return this._passwordFactory.createFromHashedText(password);
    }
    catch {
      return this._passwordFactory.createFromPlainText(password);
    }
  }
  private resolveCreatedAt(datetime: UserFactoryCreateProps['createdAt']): NonFutureDate {
    if (datetime instanceof NonFutureDate) {
      return datetime;
    }
    return this._nonFutureDateFactory.create(datetime);
  }
  private resolveRole(role: UserFactoryCreateProps['role']): UserRole {
    if (role instanceof UserRole) {
      return role;
    }
    return this._userRoleFactory.create(role ?? UserRoleEnum.User);
  }
  private resolveDeletedAt(datetime: UserFactoryAnonymousProps['deletedAt']): NonFutureDate {
    return datetime instanceof NonFutureDate ? datetime : this._nonFutureDateFactory.create(datetime);
  }
}
