import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { IUuidFactory } from "../uuid.factory";
import { IUuidService } from "@/application/services/uuid.service";

export class UuidFactory implements IUuidFactory {
  public constructor(
    private readonly _uuidService: IUuidService,
  ) {}

  public generate(): Uuid {
    const uuidStr = this._uuidService.generate();

    return this.createFromString(uuidStr);
  }
  public createFromString(uuidStr: string): Uuid {
    return new Uuid(uuidStr);
  }
}