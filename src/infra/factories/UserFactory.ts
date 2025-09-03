import type { ICpfFactory } from "@/domain/factories/ICpfFactory";
import type { IEmailAddressFactory } from "@/domain/factories/IEmailAddressFactory";
import type { IFullNameFactory } from "@/domain/factories/IFullNameFactory";
import type { IHashedPasswordFactory } from "@/domain/factories/IHashedPasswordFactory";
import type { INonFutureDatetimeFactory } from "@/domain/factories/INonFutureDatetimeFactory";
import type {
  IUserFactory,
  UserFactoryCreateActive,
  UserFactoryCreateDeleted } from "@/domain/factories/IUserFactory";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IUserRoleParser } from "@/domain/parsers/IUserRoleParser";
import { ActiveUser, DeletedUser } from "@/domain/entities/User";
import { UserRoleEnum } from "@/domain/enums/UserRoleEnum";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";

type FactoryDependencies = {
  cpfFactory: UserFactory['_cpfFactory'];
  emailAddressFactory: UserFactory['_emailAddressFactory'];
  fullNameFactory: UserFactory['_fullNameFactory'];
  userRoleParser: UserFactory['_userRoleParser'];
  uuidFactory: UserFactory['_uuidFactory'];
  nonFutureDatetimeFactory: UserFactory['_nfdFactory'];
}

export class UserFactory implements IUserFactory
{
  private readonly _cpfFactory: ICpfFactory;
  private readonly _emailAddressFactory: IEmailAddressFactory;
  private readonly _fullNameFactory: IFullNameFactory;
  private readonly _nfdFactory: INonFutureDatetimeFactory;
  private readonly _userRoleParser: IUserRoleParser;
  private readonly _uuidFactory: IUuidFactory;

  public constructor(dependencies: FactoryDependencies)
  {
    this._cpfFactory = dependencies.cpfFactory;
    this._emailAddressFactory = dependencies.emailAddressFactory;
    this._fullNameFactory = dependencies.fullNameFactory;
    this._nfdFactory = dependencies.nonFutureDatetimeFactory;
    this._userRoleParser = dependencies.userRoleParser;
    this._uuidFactory = dependencies.uuidFactory;
  }

  public createActive(data: UserFactoryCreateActive): ActiveUser
  {
    return ActiveUser.create(
    {
      id: data.id
        ? this._uuidFactory.create(data.id)
        : this._uuidFactory.generate(),
      
      name: this._fullNameFactory.create(data.name),
      cpf: this._cpfFactory.create(data.cpf),
      email: this._emailAddressFactory.create(data.email),
      password: data.password,

      role: data.role
        ? this._userRoleParser.parse(data.role)
        : UserRoleEnum.User,

      createdAt: data.createdAt
        ? this._nfdFactory.create(data.createdAt)
        : NonFutureDatetime.now(),
    });
  }

  public createDeleted(data: UserFactoryCreateDeleted): DeletedUser
  {
    return DeletedUser.create(
    {
      id: this._uuidFactory.create(data.id),
      createdAt: this._nfdFactory.create(data.createdAt),

      deletedAt: data.deletedAt
        ? this._nfdFactory.create(data.deletedAt)
        : NonFutureDatetime.now(),
    });  
  }
}
