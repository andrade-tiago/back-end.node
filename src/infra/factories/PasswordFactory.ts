import type { IPasswordFactory } from "@/domain/factories/IPasswordFactory";
import type { IPasswordParser } from "@/domain/parsers/IPasswordParser";
import { type PasswordCreateValue, Password } from "@/domain/value-objects/Password";

type FactoryDependencies = {
  passwordParser: IPasswordParser;
}

export class PasswordFactory implements IPasswordFactory
{
  private readonly _passwordParser: IPasswordParser;
  
  public constructor(dependencies: FactoryDependencies)
  {
    this._passwordParser = dependencies.passwordParser;
  }

  public create(value: PasswordCreateValue): Password
  {
    return Password.create(value, { parser: this._passwordParser });
  }
}
