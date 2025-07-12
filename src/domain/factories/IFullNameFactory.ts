import type { FullName, FullNameCreateValue } from "@/domain/value-objects/FullName";

export interface IFullNameFactory {
  create(value: FullNameCreateValue): FullName;
}
