import type { PositiveInt, PositiveIntCreateValue } from "@/domain/value-objects/PositiveInt";

export interface IPositiveIntFactory {
  create(value: PositiveIntCreateValue): PositiveInt;
}
