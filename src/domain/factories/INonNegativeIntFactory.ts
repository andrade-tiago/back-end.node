import type { NonNegativeInt, NonNegativeIntCreateValue } from "@/domain/value-objects/NonNegativeInt";

export interface INonNegativeIntFactory {
  create(value: NonNegativeIntCreateValue): NonNegativeInt;
}
