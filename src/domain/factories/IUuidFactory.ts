import type { Uuid, UuidCreateValue } from "@/domain/value-objects/Uuid";

export interface IUuidFactory {
  create(value: UuidCreateValue): Uuid;
  generate(): Uuid;
}
