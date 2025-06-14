import { Uuid } from "@/domain/shared/value-objects/uuid.vo";

export interface IUuidFactory {
  generate(): Uuid;
  createFromString(uuidStr: string): Uuid;
}
