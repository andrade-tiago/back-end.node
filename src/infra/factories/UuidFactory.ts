import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IUuidParser } from "@/domain/parsers/IUuidParser";
import type { IUuidService } from "@/domain/services/IUuidService";
import { type UuidCreateValue, Uuid } from "@/domain/value-objects/Uuid";

type FactoryDependencies = {
  uuidParser: IUuidParser;
  uuidGenerator: IUuidService;
}

export class UuidFactory implements IUuidFactory
{
  private readonly _uuidGenerator: IUuidService;
  private readonly _uuidParser: IUuidParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this._uuidGenerator = dependencies.uuidGenerator;
    this._uuidParser = dependencies.uuidParser;
  }

  public create(value: UuidCreateValue): Uuid
  {
    return Uuid.create(value, { parser: this._uuidParser });
  }

  public generate(): Uuid
  {
    const newUuidStr = this._uuidGenerator.generate();

    return Uuid.unsafeCreate(newUuidStr);
  }
}
