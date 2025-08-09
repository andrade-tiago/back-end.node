import { IFullNameFactory } from "@/domain/factories/IFullNameFactory";
import { IFullNameParser } from "@/domain/parsers/IFullNameParser";
import { FullNameCreateValue, FullName } from "@/domain/value-objects/FullName";

type FactoryDependencies = {
  fullNameParser: IFullNameParser; 
}

export class FullNameFactory implements IFullNameFactory
{
  private readonly _fullNameParser: IFullNameParser;

  public constructor({ fullNameParser }: FactoryDependencies)
  {
    this._fullNameParser = fullNameParser;
  }
  
  public create(value: FullNameCreateValue): FullName
  {
    return FullName.create(value, { parser: this._fullNameParser });
  }
}
