import { NonNegativeInt } from "@/domain/value-objects/non-negative-int.vo";

export interface INonNegativeIntFactory {
  create(value: number) : NonNegativeInt;
}
