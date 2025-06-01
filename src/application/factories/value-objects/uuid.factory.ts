import { Uuid } from "@/domain/value-objects/uuid.vo";

export interface IUuidFactory {
  generate(): Uuid;
  createFromString(uuidStr: string): Uuid;
}
