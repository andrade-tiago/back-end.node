import type { FullName, FullNameCreateValue } from "../value-objects/FullName";

export interface IFullNameFactory {
  create(value: FullNameCreateValue): FullName;
}
