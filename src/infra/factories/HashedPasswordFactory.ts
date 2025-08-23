import type { IHashedPasswordFactory } from "@/domain/factories/IHashedPasswordFactory";
import type { IHashedPasswordParser } from "@/domain/parsers/IHashedPasswordParser";
import type { IPasswordHasherService } from "@/domain/services/IPasswordHasherService";
import type { IPasswordFactory } from "@/domain/factories/IPasswordFactory";
import { HashedPassword, type HashedPasswordCreateValue } from "@/domain/value-objects/HashedPassword";
import { PasswordCreateValue } from "@/domain/value-objects/Password";

type FactoryDependencies = {
  hashedPasswordParser: IHashedPasswordParser;
  passwordFactory: IPasswordFactory;
  passwordHasherService: IPasswordHasherService;
}

export class HashedPasswordFactory implements IHashedPasswordFactory
{
  private readonly _hashedPasswordParser: IHashedPasswordParser;
  private readonly _passwordFactory: IPasswordFactory;
  private readonly _passwordHasherService: IPasswordHasherService;

  public constructor(
  {
    hashedPasswordParser,
    passwordFactory,
    passwordHasherService,
  }: 
  FactoryDependencies)
  {
    this._hashedPasswordParser = hashedPasswordParser;
    this._passwordFactory = passwordFactory;
    this._passwordHasherService = passwordHasherService;
  }

  public fromHash(value: HashedPasswordCreateValue): HashedPassword
  {
    return HashedPassword.create(value, { parser: this._hashedPasswordParser });
  }

  public fromPlain(value: PasswordCreateValue): Promise<HashedPassword>
  {
    const password = this._passwordFactory.create(value);

    return HashedPassword.fromPassword(password, { hasher: this._passwordHasherService });
  }
}
