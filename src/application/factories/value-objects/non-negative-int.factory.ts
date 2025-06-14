import { NonNegativeInt } from "@/domain/shared/value-objects/non-negative-int.vo";

export interface INonNegativeIntFactory {
  create(value: number) : NonNegativeInt;
}
