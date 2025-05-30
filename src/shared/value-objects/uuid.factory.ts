import { Uuid } from "./uuid.vo";

export interface IUuidFactory {
  generate(): Uuid;
  createFromString(uuidStr: string): Uuid;
}
